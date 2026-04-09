# Current Handoff

## Backend
- Current state: Booking backend now exists as root-level Vercel Functions so it works with the locked static `next export` setup.
- What changed: Added `GET /api/bookings/availability` and `POST /api/intake`, plus shared booking modules for validation, slot generation, rate limiting, structured logging, and Resend-backed notifications/manual confirmation.
- What frontend needs to know: Use `/api/bookings/availability` for live slots and submit the final form to `/api/intake`. Request payload should send `fullName` or `name`, `email` or `companyEmail`, `selectedDate` or `date`, `selectedTime` or `time`, and `timezone`. Success returns `status: "pending_manual_confirmation"`. Errors return `{ ok: false, requestId, error: { code, message, fields? } }`. Full contract is in `docs/booking-api.md`.

## Frontend
- Current state: REDESIGN branch (stitch-testing). homepage-cinematic.html now has a production-quality cinematic preloader (CN Tower, staggered animation, green logo mark, auto-dismiss at 3.6s). Asset paths corrected to ../public/ for local preview. book-a-call page still uses Calendly embed — needs to be replaced with booking API.
- What changed: Preloader rebuilt (CSS + HTML + JS), asset paths fixed, REDESIGN Preview server added to launch.json.
- What backend needs to know: Ready to wire `/api/bookings/availability` and `/api/intake` into book-a-call page. Will follow contract in docs/booking-api.md.

## Next priority
1. Frontend: replace the static booking widget-only flow with `/api/bookings/availability` and `/api/intake` without changing the visual direction
2. Frontend: surface field-level validation from `error.fields` and show the returned `requestId` on hard failures
3. Backend: replace the fragile opensheet jobs proxy with a first-party route or direct Sheets integration
