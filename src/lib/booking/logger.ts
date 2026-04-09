type LogLevel = 'info' | 'warn' | 'error';

type BookingLogEvent = {
  level?: LogLevel;
  event: string;
  requestId: string;
  route?: string;
  bookingId?: string;
  ip?: string | null;
  code?: string;
  detail?: string;
  metadata?: Record<string, unknown>;
};

export function logBookingEvent({
  level = 'info',
  event,
  requestId,
  route,
  bookingId,
  ip,
  code,
  detail,
  metadata,
}: BookingLogEvent) {
  const payload = {
    scope: 'booking',
    event,
    requestId,
    route,
    bookingId,
    ip,
    code,
    detail,
    metadata,
    timestamp: new Date().toISOString(),
  };

  const serialized = JSON.stringify(payload);

  if (level === 'error') {
    console.error(serialized);
    return;
  }

  if (level === 'warn') {
    console.warn(serialized);
    return;
  }

  console.info(serialized);
}
