import { getBookingConfig, type BookingConfig, type TimeRange } from '@/lib/booking/config';
import type { AvailabilityDay, AvailabilityResponseData, AvailabilitySlot } from '@/lib/booking/contracts';

function pad(value: number) {
  return String(value).padStart(2, '0');
}

function getDatePartsInZone(date: Date, timeZone: string) {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  const parts = formatter.formatToParts(date);
  const values = Object.fromEntries(
    parts
      .filter((part) => part.type !== 'literal')
      .map((part) => [part.type, part.value]),
  ) as Record<string, string>;

  return {
    year: Number(values.year),
    month: Number(values.month),
    day: Number(values.day),
    hour: Number(values.hour),
    minute: Number(values.minute),
    second: Number(values.second),
  };
}

function toDateString(parts: { year: number; month: number; day: number }) {
  return `${parts.year}-${pad(parts.month)}-${pad(parts.day)}`;
}

function addDays(date: string, amount: number) {
  const [year, month, day] = date.split('-').map(Number);
  const utcDate = new Date(Date.UTC(year, month - 1, day));
  utcDate.setUTCDate(utcDate.getUTCDate() + amount);
  return `${utcDate.getUTCFullYear()}-${pad(utcDate.getUTCMonth() + 1)}-${pad(utcDate.getUTCDate())}`;
}

function getWeekday(date: string) {
  const [year, month, day] = date.split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, day)).getUTCDay();
}

function getTimeZoneOffsetMs(date: Date, timeZone: string) {
  const zoned = getDatePartsInZone(date, timeZone);
  return (
    Date.UTC(zoned.year, zoned.month - 1, zoned.day, zoned.hour, zoned.minute, zoned.second) -
    date.getTime()
  );
}

function zonedDateTimeToUtc(date: string, time: string, timeZone: string) {
  const [year, month, day] = date.split('-').map(Number);
  const [hour, minute] = time.split(':').map(Number);
  const utcGuess = Date.UTC(year, month - 1, day, hour, minute, 0);
  const initialOffset = getTimeZoneOffsetMs(new Date(utcGuess), timeZone);
  let timestamp = utcGuess - initialOffset;

  const correctedOffset = getTimeZoneOffsetMs(new Date(timestamp), timeZone);
  if (correctedOffset !== initialOffset) {
    timestamp = utcGuess - correctedOffset;
  }

  return new Date(timestamp);
}

function addMinutesToTime(value: string, minutes: number) {
  const [hour, minute] = value.split(':').map(Number);
  const totalMinutes = hour * 60 + minute + minutes;
  const nextHour = Math.floor(totalMinutes / 60);
  const nextMinute = totalMinutes % 60;
  return `${pad(nextHour)}:${pad(nextMinute)}`;
}

function buildSlotsForRange(
  date: string,
  range: TimeRange,
  config: BookingConfig,
  now: Date,
): AvailabilitySlot[] {
  const slots: AvailabilitySlot[] = [];
  const nowWithLead = new Date(now.getTime() + config.leadHours * 60 * 60 * 1000);
  const labelFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: config.bookingTimezone,
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  for (let cursor = range.start; cursor < range.end; cursor = addMinutesToTime(cursor, config.slotMinutes)) {
    const startsAt = zonedDateTimeToUtc(date, cursor, config.bookingTimezone);
    const nextSlot = addMinutesToTime(cursor, config.slotMinutes);

    if (nextSlot > range.end || startsAt <= nowWithLead) {
      continue;
    }

    slots.push({
      slotKey: `${date}:${cursor}`,
      date,
      time: cursor,
      timezone: config.bookingTimezone,
      label: labelFormatter.format(startsAt),
      startsAt: startsAt.toISOString(),
    });
  }

  return slots;
}

export function listAvailability(options?: {
  startDate?: string;
  days?: number;
  config?: BookingConfig;
  now?: Date;
}): AvailabilityResponseData {
  const config = options?.config ?? getBookingConfig();
  const now = options?.now ?? new Date();
  const startDate =
    options?.startDate || toDateString(getDatePartsInZone(now, config.bookingTimezone));
  const days = Math.max(1, Math.min(options?.days ?? 7, config.lookaheadDays));

  const availabilityDays: AvailabilityDay[] = [];
  const today = toDateString(getDatePartsInZone(now, config.bookingTimezone));
  const weekdayFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'UTC',
    weekday: 'short',
  });

  for (let index = 0; index < days; index += 1) {
    const date = addDays(startDate, index);
    if (config.blackoutDates.has(date)) {
      continue;
    }

    const weekday = getWeekday(date);
    const ranges = config.weeklyHours[weekday] ?? [];
    if (ranges.length === 0) {
      continue;
    }

    const slots = ranges.flatMap((range) => buildSlotsForRange(date, range, config, now));
    availabilityDays.push({
      date,
      weekday: weekdayFormatter.format(new Date(`${date}T12:00:00.000Z`)),
      isToday: date === today,
      slots,
    });
  }

  return {
    mode: config.mode,
    timezone: config.bookingTimezone,
    slotMinutes: config.slotMinutes,
    lookaheadDays: config.lookaheadDays,
    days: availabilityDays.filter((day) => day.slots.length > 0),
  };
}

export function findSlot(date: string, time: string, config?: BookingConfig) {
  const result = listAvailability({
    config,
    startDate: date,
    days: 1,
  });

  return result.days.flatMap((day) => day.slots).find((slot) => slot.time === time);
}
