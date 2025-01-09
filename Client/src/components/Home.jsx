import { Link } from "react-router-dom";

export default function Home() {
  // Check if the user is logged in by checking if the token is in localStorage
  const token = localStorage.getItem("authToken");
  const userName = localStorage.getItem("userName");

  return (
    <div className="bg-black min-h-screen flex items-center justify-center">
      <div className="max-w-4xl px-6 py-12 text-center bg-gray-900 text-white rounded-lg shadow-lg border border-gray-700">
        {token ? (
          // If the user is logged in, show the personalized welcome message
          <>
            <h1 className="text-4xl font-extrabold text-white mb-6">
              Hi, {userName}! Welcome back to Task Manager
            </h1>
            <p className="text-lg text-gray-300 mb-4">
              We're excited to have you back! With Task Manager, you can plan, manage, and track all your tasks efficiently.
            </p>
            <p className="text-lg text-gray-300 mb-8">
              Here's what you can do:
              <ul className="list-disc list-inside text-gray-400">
                <li>Create new tasks</li>
                <li>Track deadlines and progress</li>
                <li>Manage your tasks with ease</li>
              </ul>
            </p>
            <div className="flex justify-center space-x-4">
              <Link 
                to="/tasks"
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-3 rounded-lg shadow-lg transition-transform transform hover:scale-105"
              >
                Go to Your Tasks
              </Link>
            </div>
          </>
        ) : (
          // If the user is not logged in, show the default message
          <>
            <h1 className="text-4xl font-extrabold text-white mb-6">
              Welcome to Task Manager
            </h1>
            <p className="text-lg text-gray-300 mb-4">
              Task Manager is your ultimate tool to stay organized and productive. 
              Plan, manage, and track your tasks with ease.
            </p>
            <p className="text-lg text-gray-300 mb-8">
              Whether you are working solo or with a team, streamline your workflow, 
              set deadlines, and achieve your goals with Task Manager.
            </p>
            <div className="flex justify-center space-x-4">
              <Link 
                to="/signup"
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-3 rounded-lg shadow-lg transition-transform transform hover:scale-105"
              >
                Get Started
              </Link>
              <Link 
                to="/login"
                className="bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium px-6 py-3 rounded-lg shadow-lg border border-gray-600 transition-transform transform hover:scale-105"
              >
                Login
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
