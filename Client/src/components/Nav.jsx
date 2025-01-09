import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Navbar } from "flowbite-react";
import { useNavigate } from 'react-router-dom';

export default function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName');
    setIsLoggedIn(false);

    setTimeout(() => {
      navigate('/');
    }, 200); 

  };
  return (
    <Navbar
  fluid
  rounded
  className="border-4 border-green-500 shadow-lg sticky top-0 z-50 bg-gray-900"
>
  <Navbar.Brand as={Link} to="/">
    <span className="self-center whitespace-nowrap text-xl font-semibold text-white">
      Task Manager
    </span>
  </Navbar.Brand>
  <Navbar.Toggle />
  <Navbar.Collapse>
    {isLoggedIn ? (
      <>
        <Navbar.Link
          as={Link}
          to="/tasks"
          className="text-white hover:text-green-400 transition-colors"
        >
          Your Tasks
        </Navbar.Link>
        <Navbar.Link
          as={Link}
          onClick={handleLogout}
          className="text-white hover:text-green-400 transition-colors"
        >
          Logout
        </Navbar.Link>
      </>
    ) : (
      <>
        <Navbar.Link
          as={Link}
          to="/login"
          className="text-white hover:text-green-400 transition-colors"
        >
          Login
        </Navbar.Link>
        <Navbar.Link
          as={Link}
          to="/signup"
          className="text-white hover:text-green-400 transition-colors"
        >
          Signup
        </Navbar.Link>
      </>
    )}
  </Navbar.Collapse>
</Navbar>

  );
}
