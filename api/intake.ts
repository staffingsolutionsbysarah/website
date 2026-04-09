import type { IncomingMessage, ServerResponse } from 'node:http';

import { findSlot } from '@/lib/booking/availability';
import { getBookingConfig } from '@/lib/booking/config';
import { deliverBookingNotifications } from '@/lib/booking/email';
import { BookingError, isBookingError } from '@/lib/booking/errors';
import { checkRateLimit } from '@/lib/booking/rate-limit';
import { createRequestId, getClientIp, readJsonBody, sendError, sendJson, sendMethodNotAllowed } from '@/lib/booking/http';
import { logBookingEvent } from '@/lib/booking/logger';
import { normalizeBookingRequest } from '@/lib/booking/validation';

export default async function handler(req: IncomingMessage & { body?: unknown }, res: ServerResponse) {
  const requestId = createRequestId();

  if (req.method !== 'POST') {
    sendMethodNotAllowed(res, requestId);
    return;
  }

  const route = '/api/intake';
  const clientIp = getClientIp(req);

  try {
    const config = getBookingConfig();
    const rateLimit = checkRateLimit(
      `${route}:${clientIp ?? 'unknown'}`,
      config.rateLimitMax,
      config.rateLimitWindowMs,
    );

    res.setHeader('X-RateLimit-Limit', String(config.rateLimitMax));
    res.setHeader('X-RateLimit-Remaining', String(rateLimit.remaining));
    res.setHeader('X-RateLimit-Reset', String(rateLimit.resetAt));

    if (!rateLimit.allowed) {
      throw new BookingError(
        'RATE_LIMITED',
        'Too many booking attempts. Please wait a few minutes and try again.',
        429,
      );
    }

    const rawBody = await readJsonBody(req);
    const intake = normalizeBookingRequest(rawBody);
    const slot = findSlot(intake.selectedDate, intake.selectedTime, config);

    if (!slot) {
      throw new BookingError(
        'SLOT_UNAVAILABLE',
        'That time is no longer available. Refresh availability and pick another slot.',
        409,
        {
          selectedDate: 'Choose a different date.',
          selectedTime: 'Choose a different time.',
        },
      );
    }

    const bookingId = crypto.randomUUID();
    const notifications = await deliverBookingNotifications({
      bookingId,
      intake,
      slotLabel: `${slot.date} ${slot.label} (${slot.timezone})`,
      config,
    });

    logBookingEvent({
      event: 'booking_created',
      requestId,
      route,
      bookingId,
      ip: clientIp,
      metadata: {
        email: intake.email,
        companyName: intake.companyName || null,
        selectedDate: slot.date,
        selectedTime: slot.time,
        notifications,
      },
    });

    sendJson(res, 201, {
      ok: true,
      requestId,
      data: {
        bookingId,
        status: 'pending_manual_confirmation',
        requestedSlot: {
          slotKey: slot.slotKey,
          date: slot.date,
          time: slot.time,
          timezone: slot.timezone,
          label: slot.label,
        },
        notifications,
      },
    });
  } catch (error) {
    logBookingEvent({
      level: isBookingError(error) && error.statusCode < 500 ? 'warn' : 'error',
      event: 'booking_failed',
      requestId,
      route,
      ip: clientIp,
      code: isBookingError(error) ? error.code : undefined,
      detail: error instanceof Error ? error.message : 'Unknown error',
    });

    sendError(res, requestId, error);
  }
}
