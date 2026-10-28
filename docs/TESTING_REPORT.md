# Testing Report

## Automated checks included
Run `npm test` from the project root (after installing dependencies; server tests use Node's built-in test runner).

| ID | Scenario | Expected result | Test status in this package environment |
|---|---|---|---|
| UT-01 | Seat `A1` format | Accepted | Test included; run locally |
| UT-02 | Seat `F12` format | Accepted | Test included; run locally |
| UT-03 | Seat `AA1` format | Rejected | Test included; run locally |
| UT-04 | Seat `A0` format | Rejected | Test included; run locally |
| UT-05 | Booking reference format | Prefix and uppercase hex suffix | Test included; run locally |
| IT-01 | Register/login with MongoDB | Valid credentials succeed | Requires local MongoDB |
| IT-02 | Invalid login | 401 response | Requires local MongoDB |
| IT-03 | User accesses another user's booking | 404 response | Requires local MongoDB |
| IT-04 | Non-admin calls admin endpoint | 403 response | Requires local MongoDB |
| IT-05 | Concurrent booking for same seat | At most one succeeds | Requires local MongoDB |
| UI-01 | Production build | Vite build succeeds | Run `npm run build` |
| UI-02 | Mobile layout | No horizontal overflow on target devices | Manual browser verification |

## Honest execution note
The archive contains tests but does not claim that the tests or production build passed in this packaging session. Install dependencies, run the commands above, and record actual outcomes. For concurrency testing, use a real MongoDB instance and send simultaneous requests for the same show/seat.
