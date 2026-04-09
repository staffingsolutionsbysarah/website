export class BookingError extends Error {
  readonly code: string;
  readonly statusCode: number;
  readonly fields?: Record<string, string>;

  constructor(
    code: string,
    message: string,
    statusCode = 400,
    fields?: Record<string, string>,
  ) {
    super(message);
    this.name = 'BookingError';
    this.code = code;
    this.statusCode = statusCode;
    this.fields = fields;
  }
}

export function isBookingError(error: unknown): error is BookingError {
  return error instanceof BookingError;
}
