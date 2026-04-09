import type { BookingRequestInput } from '@/lib/booking/contracts';
import { BookingError } from '@/lib/booking/errors';

type UnknownRecord = Record<string, unknown>;

function readString(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

function isValidTimezone(value: string) {
  try {
    Intl.DateTimeFormat('en-US', { timeZone: value });
    return true;
  } catch {
    return false;
  }
}

export function normalizeBookingRequest(body: unknown): BookingRequestInput {
  const payload = (body && typeof body === 'object' ? body : {}) as UnknownRecord;
  const normalized: BookingRequestInput = {
    fullName: readString(payload.fullName ?? payload.name),
    email: readString(payload.email ?? payload.companyEmail),
    companyName: readString(payload.companyName),
    phone: readString(payload.phone),
    roleTitle: readString(payload.roleTitle),
    notes: readString(payload.notes),
    timezone: readString(payload.timezone),
    selectedDate: readString(payload.selectedDate ?? payload.date),
    selectedTime: readString(payload.selectedTime ?? payload.time),
    website: readString(payload.website),
  };

  const fields: Record<string, string> = {};

  if (!normalized.fullName || normalized.fullName.length < 2) {
    fields.fullName = 'Enter the contact name.';
  }

  if (!normalized.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized.email)) {
    fields.email = 'Enter a valid business email address.';
  }

  if (!normalized.selectedDate || !/^\d{4}-\d{2}-\d{2}$/.test(normalized.selectedDate)) {
    fields.selectedDate = 'Choose a valid date.';
  }

  if (!normalized.selectedTime || !/^([01]\d|2[0-3]):([0-5]\d)$/.test(normalized.selectedTime)) {
    fields.selectedTime = 'Choose a valid time.';
  }

  if (!normalized.timezone || !isValidTimezone(normalized.timezone)) {
    fields.timezone = 'Choose a valid timezone.';
  }

  if (normalized.companyName && normalized.companyName.length > 120) {
    fields.companyName = 'Keep the company name under 120 characters.';
  }

  if (normalized.roleTitle && normalized.roleTitle.length > 120) {
    fields.roleTitle = 'Keep the role title under 120 characters.';
  }

  if (normalized.phone && normalized.phone.length > 40) {
    fields.phone = 'Keep the phone number under 40 characters.';
  }

  if (normalized.notes && normalized.notes.length > 1500) {
    fields.notes = 'Keep the notes under 1500 characters.';
  }

  if (normalized.website) {
    throw new BookingError('SPAM_REJECTED', 'Submission rejected.', 400);
  }

  if (Object.keys(fields).length > 0) {
    throw new BookingError('VALIDATION_ERROR', 'Please correct the highlighted fields.', 422, fields);
  }

  return normalized;
}
