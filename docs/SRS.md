# Software Requirements Specification — IMovies

## 1. Introduction
IMovies is a web-based cinema ticket booking system for discovering films, viewing showtimes, selecting seats, and keeping booking records.

## 2. Purpose and scope
The project demonstrates a client-server application using React, Express, and MongoDB. It supports customer and administrator roles. Payments and external cinema integrations are out of scope.

## 3. Problem statement
Manual ticket booking can require customers to visit a cinema or use separate systems. IMovies centralizes movie discovery, show information, seat availability, and booking history.

## 4. Objectives
- Provide searchable movie listings and details.
- Authenticate customers securely.
- Display cinema showtimes and seat layouts.
- Avoid duplicate seat bookings using server-side atomic updates.
- Provide booking history and cancellation.
- Allow admins to maintain movies and manage cinema data through protected APIs.

## 5. Functional requirements
FR-01 Users can register and log in.
FR-02 Users can view and filter movies.
FR-03 Users can view cinema showtimes.
FR-04 Authenticated users can select seats and confirm a demo booking.
FR-05 The server rejects seats already reserved for a show.
FR-06 Users can view their own bookings and ticket details.
FR-07 Users can cancel eligible future bookings.
FR-08 Administrators can create, update, and delete movies, cinemas, and shows through protected APIs.
FR-09 Administrators can review bookings through the API and dashboard.
FR-10 The application provides helpful error and empty states.

## 6. Non-functional requirements
- Responsive desktop and mobile layout.
- Password hashing and JWT-protected API routes.
- Server-side input validation and role authorization.
- Configuration through environment variables.
- Clear setup documentation and REST API responses.

## 7. User roles
Customer: browse, book, view and cancel own eligible bookings.
Administrator: customer capabilities plus administrative API access and dashboard.

## 8. Hardware and software
A modern computer, Node.js 18+, npm, MongoDB, and a current browser. VS Code is recommended.

## 9. Constraints, assumptions, dependencies
Requires a running MongoDB database. Public poster URLs need internet access; fallback styling remains available. Payment is simulated only. Production deployment requires additional operational and security review.
