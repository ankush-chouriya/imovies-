# IMovies — Cinema Ticket Booking System
## B.Tech Computer Science Project Report

**Project type:** Full-stack web application  
**Technology:** React, Node.js, Express.js, MongoDB, Mongoose  
**Version:** 1.0

## Abstract
IMovies is a web application that helps users discover movies, view showtimes, select seats, and manage ticket bookings. The frontend is built with React, while Express provides a REST API and MongoDB stores users, movies, cinemas, shows, and bookings. JWT authentication and password hashing protect user accounts. Seat reservation is checked and updated atomically on the server to prevent two successful bookings for the same seat. The checkout is explicitly a demo flow and does not process real payments.

## 1. Introduction
Cinema audiences need a convenient way to review films and organize a cinema visit. IMovies combines movie discovery and booking management in one interface.

## 2. Existing system and limitations
Traditional or disconnected booking workflows may require repeated searches, provide limited seat visibility, and make booking history harder to manage.

## 3. Proposed system
IMovies offers movie search, movie details, showtime selection, a seat map, booking confirmation, ticket view, booking history, cancellation, and administrator features.

## 4. Objectives
- Make movie browsing simple.
- Provide user registration and login.
- Show cinema schedules and seats.
- Prevent duplicate seat reservations on the server.
- Maintain booking records.
- Provide administrator APIs for core records.

## 5. System architecture
The React single-page application calls REST endpoints using Axios. Express validates requests, checks JWTs and roles, and accesses MongoDB through Mongoose. The main entities are User, Movie, Cinema, Show, and Booking.

```text
Customer/Admin Browser
        |
     React UI
        | Axios / JSON
     Express REST API
        | Mongoose
      MongoDB
```

## 6. Modules
1. Authentication: registration, login, profile retrieval and update.
2. Movie catalogue: listing, search, filters, detail view and admin CRUD.
3. Cinema/show: cinema catalogue, showtime listing, seat availability.
4. Booking: atomic seat reservation, unique reference, booking history and cancellation.
5. Admin: overview, movie management and booking summary.
6. Documentation and testing: setup guides, API collection and automated basic tests.

## 7. Functional requirements
Customers can search movies, view shows, select seats, confirm a demo booking, view a ticket, and cancel an eligible booking. Admins can manage movies, cinemas, and shows via protected endpoints.

## 8. Non-functional requirements
Responsive UI, readable errors, secure password hashing, JWT authentication, environment-based configuration, server-side authorization, and maintainable modular source code.

## 9. Technology stack
- React, JavaScript, HTML5 and CSS3
- Bootstrap 5, React Router, Axios, Lucide icons
- Node.js, Express, Mongoose, MongoDB
- JWT, bcryptjs, express-validator, Helmet, CORS, rate limiting
- Node test runner and Vite production build

## 10. Database design
User stores name, email, password hash, and role. Movie stores metadata and status. Cinema contains screens and seat dimensions. Show references a movie, cinema, screen, schedule, price, and booked seat identifiers. Booking references a user and show, stores seats, amount, status, and a unique reference.

## 11. API design
REST API groups: `/api/auth`, `/api/movies`, `/api/cinemas`, `/api/shows`, `/api/bookings`. Details are in `API_DOCUMENTATION.md`.

## 12. Authentication and security
Passwords are hashed with bcryptjs. JWTs are sent as bearer tokens. Protected endpoints resolve the current user from the token. Admin actions check the role on the server. Authentication routes are rate-limited and Helmet sets common HTTP security headers. Secrets belong in `server/.env`, never in source control.

## 13. Testing methodology and actual results
Basic Node tests validate seat identifier rules and reference formatting. The project ZIP was generated and source files were checked for expected presence. Runtime API integration, MongoDB concurrency behavior, and frontend production build must be executed in the developer's local environment because this packaging environment does not guarantee installed dependencies or a MongoDB service. Do not interpret these unrun checks as passing.

## 14. Installation and execution
Follow `README.md`. Configure `server/.env`, start MongoDB, run `npm run install:all`, `npm run seed`, and `npm run dev`.

## 15. Limitations
No real payment gateway, email delivery, third-party cinema inventory, production deployment, or automated browser tests. Poster availability depends on remote URLs. Admin UI currently focuses on movie management and booking overview; cinema and show CRUD are exposed through protected API endpoints.

## 16. Future enhancements
Payment gateway integration, expiring seat holds, email tickets, validated QR tickets, audit logs, richer admin forms, accessibility testing, deployment automation, and end-to-end tests.

## 17. Conclusion
IMovies demonstrates an integrated full-stack booking workflow with database-backed catalogue data, authenticated accounts, seat reservation logic, and documentation suitable for an academic project.

## References
- React documentation: https://react.dev/
- Express documentation: https://expressjs.com/
- MongoDB documentation: https://www.mongodb.com/docs/
- Mongoose documentation: https://mongoosejs.com/docs/
- Vite documentation: https://vite.dev/
