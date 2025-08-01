# 🚗 Ride Booking API

A secure and scalable **RESTful API** built using **Node.js**, **Express.js**, **TypeScript**, and **MongoDB**. This backend system powers a complete **Ride Booking platform** supporting riders, drivers, and admins through role-based access, robust ride lifecycle management, and driver onboarding workflows.

---

## 📌 Features

- ✅ JWT-based authentication for all users  
- 🧍 Riders: Request/cancel rides, view ride history  
- 🚖 Drivers: Apply, accept/reject rides, track earnings  
- 🛡️ Admins: Manage users & drivers, view all ride data  
- ⏱️ Timestamps: Automatically track ride progress  
- 🔐 Secure routes with role-based authorization (Admin | Driver | Rider)  
- 💡 Clean error handling and modular code architecture  

---

## 🛠 Tech Stack

| Category      | Tech                                     |
|---------------|------------------------------------------|
| Backend       | Node.js, Express.js, TypeScript          |
| Database      | MongoDB with Mongoose                    |
| Auth & Crypto | JWT, bcrypt                              |
| Validation    | Zod                                      |
| Middleware    | dotenv, cookie-parser, cors              |
| Dev Tools     | ts-node-dev, ESLint, Prettier            |

---

## ⚙️ Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/mostaryjahan/Ride-booking-system-backend.git
cd Ride-booking-system-backend
```
2️⃣ Install Dependencies
```
npm install
```

3️⃣ Create .env File
```
PORT=5000
DB_URL=mongodb://localhost:27017/rideBooking
NODE_ENV=development
JWT_ACCESS_SECRET=your_jwt_secret
JWT_ACCESS_EXPIRES=1d
JWT_REFRESH_SECRET=your_refresh_secret
JWT_REFRESH_EXPIRES=30d
EXPRESS_SESSION_SECRET=your_express_session_secret
BCRYPT_SALT_ROUND=100
FRONTEND_URL=your_frontend_url
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password

```
4️⃣ Run the Server
```
npm run dev
```

## API Endpoints Overview

### 🔐 Auth

| Method | Endpoint              | Description                     |
|--------|-----------------------|---------------------------------|
| POST   | `/auth/login`         | Login and receive JWT           |
| POST   | `/auth/logout`        | Logout and remove JWT           |
| POST   | `/auth/set-password`  | Set Password for Google Auth User |

---

### 👤 User

| Method | Endpoint       | Description                            |
|--------|----------------|----------------------------------------|
| POST   | `/user/register` | Register new user (default: rider)     |
| PATCH  | `/user/:id`      | Update user profile                    |

---

### 🛡️ Admin

| Method | Endpoint                         | Description                    |
|--------|----------------------------------|--------------------------------|
| GET    | `/admin/users`                   | View all users                 |
| GET    | `/admin/rides`                   | View all rides                 |
| GET    | `/admin/drivers`                 | View all drivers               |
| PATCH  | `/admin/driver/approve/:id`      | Approve driver application     |
| PATCH  | `/admin/driver/suspend/:id`      | Suspend driver application     |
| PATCH  | `/admin/user/block/:id`          | Block user                     |
| PATCH  | `/admin/user/unblock/:id`        | Unblock user                   |
| GET    | `/admin/report`                  | Generate Report                |

---

### 👷 Driver

| Method | Endpoint                          | Description                                        |
|--------|-----------------------------------|----------------------------------------------------|
| POST   | `/driver/apply-driver`            | Apply as driver                                   |
| GET    | `/driver/rides-available`         | View unassigned ride requests                     |
| GET    | `/driver/earning-history`         | View own ride/earning history                     |
| PATCH  | `/driver/rides/:id/accept`        | Accept a ride                                     |
| PATCH  | `/driver/rides/:id/reject`        | Reject a ride                                     |
| PATCH  | `/driver/rides/:id/status`        | Progress ride: `picked_up → in_transit → completed` |

---

### 🛺 Ride

| Method | Endpoint             | Description                  |
|--------|----------------------|------------------------------|
| POST   | `/rides/request`     | (Rider) Request a ride       |
| PATCH  | `/rides/:id/cancel`  | (Rider) Cancel a ride        |
| GET    | `/rides/me`          | (Rider) View all ride history |
| GET    | `/rides/:id`         | (Rider) View single ride history |


📁 Folder Structure
```
src/
├── app/
│   ├── modules/
│   │   ├── auth/
│   │   ├── user/
│   │   ├── driver/
│   │   ├── admin/
│   │   ├── ride/
│   ├── middlewares/
│   ├── utils/
│   ├── config/
│   ├── routes/
├── app.ts
├── server.ts
```


🌐 Live Link : 





