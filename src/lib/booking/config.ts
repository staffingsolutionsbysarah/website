const DEFAULT_WEEKLY_HOURS = 'MON=09:00-16:00;TUE=09:00-16:00;WED=09:00-16:00;THU=09:00-16:00;FRI=09:00-13:00';

export type TimeRange = {
  start: string;
  end: string;
};

export type BookingConfig = {
  mode: 'manual_confirmation';
  bookingTimezone: string;
  slotMinutes: number;
  leadHours: number;
  lookaheadDays: number;
  weeklyHours: Record<number, TimeRange[]>;
  blackoutDates: Set<string>;
  rateLimitMax: number;
  rateLimitWindowMs: number;
  resendApiKey?: string;
  bookingFromEmail?: string;
  bookingReplyToEmail?: string;
  bookingNotificationTo: string;
  allowLogOnly: boolean;
};

function parseInteger(value: string | undefined, fallback: number, min: number, max: number) {
  if (!value) {
    return fallback;
  }

  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed)) {
    return fallback;
  }

  return Math.max(min, Math.min(max, parsed));
}

function parseTimeRange(value: string): TimeRange | null {
  const [start, end] = value.split('-').map((part) => part.trim());
  const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;

  if (!start || !end || !timePattern.test(start) || !timePattern.test(end) || start >= end) {
    return null;
  }

  return { start, end };
}

function parseWeeklyHours(value: string | undefined): Record<number, TimeRange[]> {
  const source = value?.trim() || DEFAULT_WEEKLY_HOURS;
  const byDay: Record<number, TimeRange[]> = {
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
  };

  const weekdayIndex: Record<string, number> = {
    SUN: 0,
    MON: 1,
    TUE: 2,
    WED: 3,
    THU: 4,
    FRI: 5,
    SAT: 6,
  };

  for (const segment of source.split(';')) {
    const trimmedSegment = segment.trim();
    if (!trimmedSegment) {
      continue;
    }

    const [dayKey, rangesSource = ''] = trimmedSegment.split('=');
    const weekday = weekdayIndex[dayKey.trim().toUpperCase()];
    if (weekday === undefined) {
      continue;
    }

    const ranges = rangesSource
      .split('|')
      .map((range) => parseTimeRange(range.trim()))
      .filter((range): range is TimeRange => range !== null);

    byDay[weekday] = ranges;
  }

  return byDay;
}

function parseBlackoutDates(value: string | undefined) {
  return new Set(
    (value ?? '')
      .split(',')
      .map((entry) => entry.trim())
      .filter((entry) => /^\d{4}-\d{2}-\d{2}$/.test(entry)),
  );
}

export function getBookingConfig(): BookingConfig {
  return {
    mode: 'manual_confirmation',
    bookingTimezone: process.env.BOOKING_TIMEZONE || 'America/Toronto',
    slotMinutes: parseInteger(process.env.BOOKING_SLOT_MINUTES, 30, 15, 120),
    leadHours: parseInteger(process.env.BOOKING_LEAD_HOURS, 24, 0, 168),
    lookaheadDays: parseInteger(process.env.BOOKING_LOOKAHEAD_DAYS, 14, 1, 31),
    weeklyHours: parseWeeklyHours(process.env.BOOKING_WEEKLY_HOURS),
    blackoutDates: parseBlackoutDates(process.env.BOOKING_BLACKOUT_DATES),
    rateLimitMax: parseInteger(process.env.BOOKING_RATE_LIMIT_MAX, 6, 1, 50),
    rateLimitWindowMs: parseInteger(process.env.BOOKING_RATE_LIMIT_WINDOW_MS, 600_000, 1_000, 86_400_000),
    resendApiKey: process.env.RESEND_API_KEY,
    bookingFromEmail: process.env.BOOKING_FROM_EMAIL,
    bookingReplyToEmail: process.env.BOOKING_REPLY_TO_EMAIL,
    bookingNotificationTo:
      process.env.BOOKING_NOTIFICATION_TO || 'sarah@staffingsolutionsbysarah.com',
    allowLogOnly:
      process.env.BOOKING_ALLOW_LOG_ONLY === 'true' || process.env.NODE_ENV !== 'production',
  };
}
