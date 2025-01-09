import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('isLogin', true);
        localStorage.setItem('userName',response.data.userName);
        navigate('/');
        toast.success('Login successful!');
      }
    } catch (error) {
      toast.error('Invalid credentials!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex justify-center items-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-white text-3xl mb-6 text-center">Login to Task Manager</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-white">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-2 p-2 rounded-lg bg-gray-700 text-white border-none focus:outline-none"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="text-white">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-2 p-2 rounded-lg bg-gray-700 text-white border-none focus:outline-none"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="flex justify-between items-center">
            <Link to="/signup" className="text-white text-sm hover:underline">
              Don't have an account? Signup
            </Link>
            <button
              type="submit"
              className={`bg-green-500 text-white py-2 px-4 rounded-lg ${loading && 'opacity-50 cursor-not-allowed'}`}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Login;
