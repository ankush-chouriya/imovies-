# User Guide

## Customer
1. Open the frontend URL and browse the featured movies.
2. Search or filter movies on the Movies page.
3. Open a movie and choose one of its available showtimes.
4. Register or log in.
5. Select available seats; selected seats are highlighted and the total updates.
6. Continue to confirm the demo booking. No real payment is collected.
7. Open My bookings to view the reference and ticket details.
8. Cancel a future confirmed booking when cancellation is allowed.

## Administrator
1. Log in with the seeded administrator account on a local demo.
2. Open Admin from the navigation.
3. Review movie, cinema, showtime, and booking counts.
4. Add or delete movie records in the dashboard.
5. The API also provides protected create/update/delete endpoints for cinemas and shows.

## Troubleshooting
- If the page cannot load data, check the backend health endpoint and MongoDB connection.
- If there are no movies or shows, run `npm run seed`.
- If login fails, confirm you are using the seeded credentials or the account you registered.
- If booking returns a seat conflict, refresh the page and select seats that are still available.
- If the API port changes, update `PORT`, `CLIENT_ORIGIN`, and the client API base URL as appropriate.
