export type BookingMode = 'manual_confirmation';

export type AvailabilitySlot = {
  slotKey: string;
  date: string;
  time: string;
  timezone: string;
  label: string;
  startsAt: string;
};

export type AvailabilityDay = {
  date: string;
  weekday: string;
  isToday: boolean;
  slots: AvailabilitySlot[];
};

export type AvailabilityResponseData = {
  mode: BookingMode;
  timezone: string;
  slotMinutes: number;
  lookaheadDays: number;
  days: AvailabilityDay[];
};

export type BookingRequestInput = {
  fullName: string;
  email: string;
  companyName?: string;
  phone?: string;
  roleTitle?: string;
  notes?: string;
  timezone: string;
  selectedDate: string;
  selectedTime: string;
  website?: string;
};

export type NotificationStatus = 'sent' | 'failed' | 'skipped' | 'log_only';

export type BookingResponseData = {
  bookingId: string;
  status: 'pending_manual_confirmation';
  requestedSlot: {
    slotKey: string;
    date: string;
    time: string;
    timezone: string;
    label: string;
  };
  notifications: {
    internal: NotificationStatus;
    confirmation: NotificationStatus;
  };
};

export type ApiSuccess<T> = {
  ok: true;
  requestId: string;
  data: T;
};

export type ApiErrorResponse = {
  ok: false;
  requestId: string;
  error: {
    code: string;
    message: string;
    fields?: Record<string, string>;
  };
};
