# Database Design

## Collections and relationships
- **User**: name, unique lowercase email, passwordHash (excluded by default), role, timestamps.
- **Movie**: title, description, genres, language, duration, rating, release date, image URLs, cast, director, status, featured flag.
- **Cinema**: name, location, address, embedded screen records with rows and seats per row.
- **Show**: references Movie, Cinema, and screen; date, time, ticket price, layout dimensions, booked seat IDs, status.
- **Booking**: unique booking reference, User reference, Show reference, selected seat IDs, total amount, status.

## Relationships
`Movie 1 ── many Show`; `Cinema 1 ── many Show`; `User 1 ── many Booking`; `Show 1 ── many Booking`.

## Indexes and validation
- User email unique.
- Booking reference unique.
- Show indexes on movie/date and cinema/date lookup fields.
- Mongoose schema validation for required fields, status enums, rating, and price.

## Seat consistency
A show document stores the seat identifiers already booked. The booking API conditionally updates the show only when `bookedSeats` contains none of the requested seats. MongoDB serializes the atomic document update, so concurrent requests for overlapping seats cannot both reserve those seats. The handler releases seats if booking creation throws. Cancellation marks a booking cancelled and pulls its seats from a future show. This design is intended for a small educational app; a high-volume production system should add idempotency, audit logs, more rigorous cancellation policy, and integration tests.
