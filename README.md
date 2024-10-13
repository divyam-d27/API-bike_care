# Bike Care API

Bike Care API is a backend service that allows users to register, login, post bike complaints, and add notes to those complaints. It also includes an admin interface for managing users and complaints.

## Features

- User registration and authentication
- Bike complaint submission
- Comment/note addition to complaints
- Admin dashboard for user and complaint management
- Middleware for error handling, authentication, and admin verification

## Technology Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- MongoDB

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/divyam-d27/API-bike_care.git
   ```

2. Navigate to the project directory:
   ```
   cd API-bike_care
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Create a `.env` file in the root directory and add the following:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

5. Start the server:
   ```
   npm start
   ```

## API Endpoints

### Authentication

- `POST /api/user` - Register a new user
- `POST /api/user/login` - Login and receive a JWT

### Bike Complaints

- `POST /api/bike` - Submit a new bike complaint
- `GET /api/bike` - Get all complaints for the authenticated user
- `GET /api/bike/:id` - Get a specific complaint
- `PUT /api/bike/close/:id` - Update a complaint
- `DELETE /api/admin/user/bike/delete/:id` - Delete a complaint (admin only)

### Notes

- `POST /api/bike/:id/note` - Add a note to a complaint
- `GET /api/bike/:id/note` - Get all notes for a complaint

### Admin

- `GET /api/admin/users` - Get all users (admin only)
- `GET /api/admin/user/bike/:id` - Get all complaints posted by a user (admin only)
- `GET /api/admin/user/bike/note/:id` - Get all notes associated to a complaint (admin only)
- `DELETE /api/admin/user/bike/delete/:id` - Delete a complaint (admin only)

## Middleware

1. Error Handling Middleware
   - Catches and formats errors for consistent API responses

2. Authentication Middleware
   - Verifies JWT and attaches user information to the request

3. Admin Authentication Middleware
   - Ensures the authenticated user has admin privileges
