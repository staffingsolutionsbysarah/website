import type { IncomingMessage, ServerResponse } from 'node:http';

import { listAvailability } from '@/lib/booking/availability';
import { BookingError } from '@/lib/booking/errors';
import { getBookingConfig } from '@/lib/booking/config';
import { createRequestId, getRequestUrl, sendError, sendJson, sendMethodNotAllowed } from '@/lib/booking/http';
import { logBookingEvent } from '@/lib/booking/logger';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  const requestId = createRequestId();

  if (req.method !== 'GET') {
    sendMethodNotAllowed(res, requestId);
    return;
  }

  try {
    const config = getBookingConfig();
    const url = getRequestUrl(req);
    const startDate = url.searchParams.get('startDate') ?? undefined;
    const daysParam = url.searchParams.get('days');
    const days = daysParam ? Number.parseInt(daysParam, 10) : undefined;

    if (startDate && !/^\d{4}-\d{2}-\d{2}$/.test(startDate)) {
      throw new BookingError('VALIDATION_ERROR', 'startDate must use YYYY-MM-DD.', 422, {
        startDate: 'Use YYYY-MM-DD.',
      });
    }

    const availability = listAvailability({
      config,
      startDate,
      days,
    });

    logBookingEvent({
      event: 'availability_listed',
      requestId,
      route: '/api/bookings/availability',
      metadata: {
        returnedDays: availability.days.length,
        startDate: startDate ?? availability.days[0]?.date ?? null,
      },
    });

    sendJson(res, 200, {
      ok: true,
      requestId,
      data: availability,
    });
  } catch (error) {
    logBookingEvent({
      level: 'error',
      event: 'availability_failed',
      requestId,
      route: '/api/bookings/availability',
      detail: error instanceof Error ? error.message : 'Unknown error',
      metadata: {
        method: req.method,
      },
    });
    sendError(res, requestId, error);
  }
}
