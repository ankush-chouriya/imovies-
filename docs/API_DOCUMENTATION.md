# IMovies REST API Documentation

Base URL: `http://localhost:5000/api`. All JSON responses use `success`, optional `message`, and `data`. Protected routes require `Authorization: Bearer <token>`.

## Authentication
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/auth/register` | No | `{name,email,password}`; password minimum 8 chars |
| POST | `/auth/login` | No | `{email,password}`; returns token and safe user |
| GET | `/auth/me` | User | Current account |
| PATCH | `/auth/me` | User | Update `{name}` only |

## Movies
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/movies?q=&genre=&language=&status=` | No | List/filter movies |
| GET | `/movies/:id` | No | Movie details |
| POST | `/movies` | Admin | Create movie |
| PATCH | `/movies/:id` | Admin | Update movie |
| DELETE | `/movies/:id` | Admin | Delete movie |

## Cinemas
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/cinemas` | No | List cinemas |
| POST | `/cinemas` | Admin | Create cinema |
| PATCH | `/cinemas/:id` | Admin | Update cinema |
| DELETE | `/cinemas/:id` | Admin | Delete cinema |

## Shows
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/shows?movieId=&cinemaId=&date=` | No | List scheduled shows |
| GET | `/shows/:id/seats` | No | Show details and booked seats |
| POST | `/shows` | Admin | Create show |
| PATCH | `/shows/:id` | Admin | Update show |
| DELETE | `/shows/:id` | Admin | Delete show |

## Bookings
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/bookings` | User | `{showId, selectedSeats:["A1","A2"]}` |
| GET | `/bookings/mine` | User | Current user's bookings |
| GET | `/bookings/:id` | Owner/Admin | Booking ticket |
| PATCH | `/bookings/:id/cancel` | Owner/Admin | Cancel active booking and release seats for future shows |
| GET | `/bookings/admin/all` | Admin | All bookings |

## Health
`GET /health` is mounted at `/api/health`.

## Status codes
- `200` success
- `201` resource created
- `400` invalid input
- `401` missing/invalid authentication
- `403` insufficient role
- `404` resource or route not found
- `409` duplicate email or unavailable seat
- `500` unexpected server error

## Booking conflict response
```json
{
  "success": false,
  "message": "One or more seats are no longer available. Refresh seat availability and try again."
}
```
The show update uses a conditional atomic MongoDB operation. If any selected seat is already in `bookedSeats`, the update does not reserve any of the requested seats.
