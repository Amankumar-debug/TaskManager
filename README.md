# Task Management Application

This is a full-stack task management application built with a Node.js/Express backend and a Next.js/React frontend. The backend uses MongoDB for data storage.

## Prerequisites

- Node.js (version 14 or higher)
- MongoDB (running locally or a MongoDB Atlas connection string)
- npm or yarn

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd TaskManagement/backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the `backend` directory and add your MongoDB connection string:
   ```
   MONGO_URL=mongodb://localhost:27017/taskmanagement
   ```
   Replace with your actual MongoDB URL if using a remote database.

4. Start the backend server:
   ```
   node app.js
   ```
   The server will run on http://localhost:8000.

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd TaskManagement/frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```
   The frontend will run on http://localhost:3000.

## Running the Application

- Ensure MongoDB is running.
- Start the backend server first.
- Then start the frontend development server.
- Open http://localhost:3000 in your browser to access the application.

## API Endpoints

The backend provides task management endpoints. Refer to `backend/routes/task.routes.js` for details.

## Technologies Used

- Backend: Node.js, Express, MongoDB, Mongoose
- Frontend: Next.js, React
