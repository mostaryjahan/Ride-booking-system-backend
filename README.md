README

README.md

# Ride Booking API

A secure, scalable, role-based backend API for a ride booking system built with Express.js, Mongoose, and Zod for validation.

## Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd ride-booking-api
   ```

Install dependencies:

npm install

Set up environment variables: Create a .env file in the root directory with:

MONGODB_URI=mongodb://localhost:27017/ride_booking
JWT_SECRET=your_secret_key
PORT=3000

Run the application:

npm start

API Endpoints

Auth

POST /api/auth/register - Register a new user (rider/driver/admin)

POST /api/auth/login - Login and receive JWT

Users (Admin)

GET /api/users - Get all users

PATCH /api/users/block/:id - Block/unblock a user

PATCH /api/users/approve/:id - Approve/reject a driver

Drivers

PATCH /api/drivers/availability - Update driver availability

GET /api/drivers/earnings - Get driver earnings

Rides

POST /api/rides/request - Request a new ride (rider)

PATCH /api/rides/:id/cancel - Cancel a ride (rider)

PATCH /api/rides/:id/status - Update ride status (driver)

GET /api/rides/me - Get ride history (rider/driver)

GET /api/rides - Get all rides (admin)

Testing

Use Postman to test the endpoints.

Import the provided Postman collection (if available) or manually test the routes.

Ensure to include the Authorization: Bearer <token> header for protected routes.

Video Demonstration

A 5–10 minute video is provided, showcasing:

Project introduction and folder structure

Authentication flow (register, login, JWT)

Rider features (request, cancel, history)

Driver features (accept, status updates, earnings)

Admin features (user management, driver approval)

Postman end-to-end testing

---

This implementation includes:

- **JWT-based authentication** with bcrypt for password hashing
- **Role-based authorization** using middleware
- **Rider logic**: Request/cancel rides, view history
- **Driver logic**: Accept/reject rides, update status, view earnings, set availability
- **Admin logic**: Manage users, approve/suspend drivers, view all rides
- **Modular MVC architecture** with controllers, services, models, routes, and validations
- **Zod validation** for all input data
- **Ride history** with timestamps and status tracking
- **Error handling** with proper status codes

The code is production-ready, scalable, and follows RESTful conventions. You can test it using Postman and create a video demo as per the requirements. Let me know if you need further clarification or additional features!
