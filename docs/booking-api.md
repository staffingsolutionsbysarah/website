# Booking API

The frontend is still static. The booking backend is implemented as root-level Vercel Functions so it works alongside the locked `output: "export"` Next.js build.

## Runtime shape

- Deployment target: Vercel Functions in `/api`
- Booking mode: `manual_confirmation`
- Availability source: server-side weekly availability config
- Booking persistence: operational inbox + structured Vercel logs
- Booking confirmation: request accepted immediately, calendar invite confirmed manually

## Endpoints

### `GET /api/bookings/availability`

Returns currently available booking slots using the server-side weekly schedule.

#### Query params

- `startDate` optional, format `YYYY-MM-DD`
- `days` optional, integer, capped by `BOOKING_LOOKAHEAD_DAYS`

#### Success response

```json
{
  "ok": true,
  "requestId": "a578ca3a-38ab-418c-ac0b-a8046010db26",
  "data": {
    "mode": "manual_confirmation",
    "timezone": "America/Toronto",
    "slotMinutes": 30,
    "lookaheadDays": 14,
    "days": [
      {
        "date": "2026-04-10",
        "weekday": "Fri",
        "isToday": false,
        "slots": [
          {
            "slotKey": "2026-04-10:09:00",
            "date": "2026-04-10",
            "time": "09:00",
            "timezone": "America/Toronto",
            "label": "9:00 AM",
            "startsAt": "2026-04-10T13:00:00.000Z"
          }
        ]
      }
    ]
  }
}
```

### `POST /api/intake`

Validates the intake submission, checks whether the selected slot is still available, and creates a booking request with status `pending_manual_confirmation`.

#### Required fields

- `fullName` or `name`
- `email` or `companyEmail`
- `selectedDate` or `date` in `YYYY-MM-DD`
- `selectedTime` or `time` in `HH:MM`
- `timezone`

#### Optional fields

- `companyName`
- `phone`
- `roleTitle`
- `notes`
- `website`

`website` is a honeypot field and must stay empty.

#### Success response

```json
{
  "ok": true,
  "requestId": "2a487860-dcb8-4e28-84ea-8bcfa0404fd5",
  "data": {
    "bookingId": "7a67827f-84d4-43b2-b6d7-d53fe2098bd1",
    "status": "pending_manual_confirmation",
    "requestedSlot": {
      "slotKey": "2026-04-10:09:00",
      "date": "2026-04-10",
      "time": "09:00",
      "timezone": "America/Toronto",
      "label": "9:00 AM"
    },
    "notifications": {
      "internal": "sent",
      "confirmation": "sent"
    }
  }
}
```

#### Error response

```json
{
  "ok": false,
  "requestId": "d1d1761d-f77b-451a-a6a4-aa080d21d7fd",
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Please correct the highlighted fields.",
    "fields": {
      "email": "Enter a valid business email address."
    }
  }
}
```

Other error codes returned by the API:

- `SLOT_UNAVAILABLE`
- `RATE_LIMITED`
- `SPAM_REJECTED`
- `INTEGRATION_NOT_CONFIGURED`
- `EMAIL_DELIVERY_FAILED`
- `INTERNAL_ERROR`

## Environment variables

- `BOOKING_TIMEZONE`
- `BOOKING_SLOT_MINUTES`
- `BOOKING_LEAD_HOURS`
- `BOOKING_LOOKAHEAD_DAYS`
- `BOOKING_WEEKLY_HOURS`
- `BOOKING_BLACKOUT_DATES`
- `BOOKING_RATE_LIMIT_MAX`
- `BOOKING_RATE_LIMIT_WINDOW_MS`
- `BOOKING_NOTIFICATION_TO`
- `BOOKING_FROM_EMAIL`
- `BOOKING_REPLY_TO_EMAIL`
- `BOOKING_ALLOW_LOG_ONLY`
- `RESEND_API_KEY`

### Example `BOOKING_WEEKLY_HOURS`

```txt
MON=09:00-16:00;TUE=09:00-16:00;WED=09:00-16:00;THU=09:00-16:00;FRI=09:00-13:00
```

Multiple windows per day are allowed:

```txt
MON=09:00-12:00|13:00-16:00;TUE=09:00-12:00|13:00-16:00
```

## Frontend integration notes

- Always fetch availability from `/api/bookings/availability` instead of hardcoding time slots.
- Submit the final intake payload to `/api/intake`.
- Treat `pending_manual_confirmation` as accepted but not yet calendar-confirmed.
- Use `error.fields` for field-level UI feedback.
- Use `requestId` in support/debug output when submission fails.
