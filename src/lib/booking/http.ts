import type { IncomingMessage, ServerResponse } from 'node:http';

import { BookingError } from '@/lib/booking/errors';
import { isBookingError } from '@/lib/booking/errors';
import type { ApiErrorResponse, ApiSuccess } from '@/lib/booking/contracts';

type RequestWithParsedBody = IncomingMessage & {
  body?: unknown;
};

export function createRequestId() {
  return crypto.randomUUID();
}

export async function readJsonBody(req: RequestWithParsedBody) {
  if (req.body !== undefined) {
    if (typeof req.body === 'string') {
      try {
        return req.body ? JSON.parse(req.body) : {};
      } catch {
        throw new BookingError('INVALID_JSON', 'Request body must be valid JSON.', 400);
      }
    }

    return req.body;
  }

  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }

  const raw = Buffer.concat(chunks).toString('utf8').trim();
  if (!raw) {
    return {};
  }

  try {
    return JSON.parse(raw);
  } catch {
    throw new BookingError('INVALID_JSON', 'Request body must be valid JSON.', 400);
  }
}

export function getRequestUrl(req: IncomingMessage) {
  const host = req.headers.host || 'localhost';
  return new URL(req.url || '/', `https://${host}`);
}

export function getClientIp(req: IncomingMessage) {
  const forwardedFor = req.headers['x-forwarded-for'];
  if (typeof forwardedFor === 'string' && forwardedFor.length > 0) {
    return forwardedFor.split(',')[0]?.trim() ?? null;
  }

  return req.socket.remoteAddress ?? null;
}

export function sendJson<T>(
  res: ServerResponse,
  statusCode: number,
  payload: ApiSuccess<T> | ApiErrorResponse,
) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(payload));
}

export function sendMethodNotAllowed(res: ServerResponse, requestId: string, method = 'Method not allowed.') {
  sendJson(res, 405, {
    ok: false,
    requestId,
    error: {
      code: 'METHOD_NOT_ALLOWED',
      message: method,
    },
  });
}

export function sendError(res: ServerResponse, requestId: string, error: unknown) {
  if (isBookingError(error)) {
    sendJson(res, error.statusCode, {
      ok: false,
      requestId,
      error: {
        code: error.code,
        message: error.message,
        fields: error.fields,
      },
    });
    return;
  }

  sendJson(res, 500, {
    ok: false,
    requestId,
    error: {
      code: 'INTERNAL_ERROR',
      message: 'An unexpected error occurred.',
    },
  });
}
