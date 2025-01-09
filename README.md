# Task Manager Web Application

A full-stack Task Manager application built with Node.js, Express.js, MongoDB, and React. The application allows users to register, log in, and manage their tasks (Create, Read, Update, Delete).

## Features

- **User Authentication:**
  - User registration and login functionality with JWT-based authentication.
  
- **Task Management:**
  - CRUD (Create, Read, Update, Delete) operations for tasks.
  - Tasks include a title, description, due date, priority, and status (pending, in-progress, completed).
  
- **Responsive Design:**
  - A responsive frontend built with React to ensure a great user experience on any device.

## Technologies Used

- **Backend:**
  - Node.js
  - Express.js
  - JWT (JSON Web Token) for user authentication
  - MongoDB for database storage

- **Frontend:**
  - React.js for the frontend UI
  - Tailwind CSS for styling

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)
- MongoDB (or you can use MongoDB Atlas)

### Backend Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/task-manager.git
    cd task-manager
    ```

2. Install backend dependencies:

    ```bash
    cd server
    npm install
    ```

3. Create a `.env` file in the `server` directory and add the following environment variables:

    ```env
    MONGO_URI=your_mongo_db_connection_string
    JWT_SECRET=your_jwt_secret
    ```

4. Run the backend server:

    ```bash
    npm start
    ```

   The backend will now be running at `http://localhost:5000`.

### Frontend Setup

1. Go to the frontend directory:

    ```bash
    cd client
    ```

2. Install frontend dependencies:

    ```bash
    npm install
    ```

3. Run the frontend development server:

    ```bash
    npm start
    ```

   The frontend will now be running at `http://localhost:3000`.

### API Endpoints

- **POST /api/register**: User registration.
- **POST /api/login**: User login.
- **GET /api/task**: Get all tasks for the logged-in user.
- **POST /api/task/add**: Add a new task.
- **PUT /api/task/:id**: Update an existing task.
- **DELETE /api/task/:id**: Delete a task.

### Authentication

- The application uses JWT (JSON Web Token) for user authentication.
- After registering or logging in, the server sends a JWT token, which is saved in the local storage of the frontend.
- The token is sent with API requests to authorize the user.

## Usage

1. Open the app in your browser.
2. Register or log in using your credentials.
3. Once logged in, you can add, edit, and delete tasks from your dashboard.
4. Tasks are displayed with their title, description, due date, priority, and status.
5. You can edit or delete tasks by clicking the respective buttons.

## Deployment

The application is not hosted because i do not know very well how to do this also i do not have a domain

## Demo Video

Watch the demo video showcasing the functionality of the Task Manager application:

[Demo Video Link]([https://drive.google.com/file/d/1TPhUFfvz2FulcdXjZvV09Y96rOrD6hue/view?usp=sharing])

## Code Structure

- **server/**: Contains the backend Node.js application.
  - **models/**: Mongoose models for User and Task.
  - **controllers/**: Controllers for handling API requests.
  - **routes/**: API routes for user and task management.
  - **middleware/**: Middleware for authentication and authorization.
  - **server.js**: Entry point for the backend server.

- **client/**: Contains the frontend React application.
  - **src/components/**: React components for the task manager interface.
  - **src/pages/**: Pages for user registration, login, and task management.
  - **src/services/**: Services for handling API requests.

## Security Considerations

- Passwords are hashed using bcrypt before storing in the database.
- JWT tokens are used for secure authentication and authorization.
- Input validation and error handling are implemented to protect the application.
