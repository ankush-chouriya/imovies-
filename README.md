# IMovies — Cinema Ticket Booking System

A college-project-ready full-stack cinema booking application built with React, Express, and MongoDB. It includes account registration/login, movie discovery, showtimes, seat selection, booking history, cancellation, and protected admin APIs. Payments are **not processed**; booking confirmation is a local demo flow.

## Requirements
- Node.js 18+ (20+ recommended)
- npm
- MongoDB Community Server locally, or a MongoDB connection string

## Quick start
1. Extract the ZIP and open the `imovies` folder in VS Code.
2. Start MongoDB locally, or create a database URI.
3. Copy `server/.env.example` to `server/.env` and set `MONGODB_URI` and a long random `JWT_SECRET`.
4. In a terminal at the project root:
   ```bash
   npm run install:all
   npm run seed
   npm run dev
   ```
5. Open the Vite URL shown in the terminal (normally http://localhost:5173). API health check: http://localhost:5000/api/health.

## Demo accounts
Seed script creates `admin@imovies.local` / `Admin123!` and `user@imovies.local` / `User123!`. Change these immediately if you use the project outside a local demo. Seed data is for demonstration only.

## Useful commands
- `npm run dev` — client and API together
- `npm run seed` — populate movies, cinemas, and shows
- `npm test` — backend unit tests
- `npm run build` — frontend production build

If you prefer separate terminals, run `npm run dev --prefix server` and `npm run dev --prefix client`.

## Configuration
Server variables are documented in `server/.env.example`. Client API base URL is in `client/.env.example`; its default is `http://localhost:5000/api`.

## Booking consistency
A show document stores its booked seat identifiers. Booking uses a MongoDB conditional atomic update that only succeeds when none of the requested seats are already in `bookedSeats`; simultaneous attempts for the same seats cannot both succeed. If booking record creation fails after reserving seats, the handler attempts to release them. Cancellation also releases seats. This mechanism works on a standalone local MongoDB and does not require replica-set transactions.

## Important notes
- Demo checkout does not collect payment details and never claims a real payment was processed.
- Movie poster URLs use public image services where available; local gradient fallback styles keep cards usable when images are unavailable.
- API tests are lightweight unit tests and do not require a running MongoDB instance. Integration tests against a real database should be run locally before deployment.
- This is an educational starting point, not a security-audited production ticketing system.
