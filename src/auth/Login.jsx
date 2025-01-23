import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../features/authSlice'; 

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
   if (username === 'admin' && password === '1234') {
      dispatch(login()); 
      navigate('/form-builder'); 
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="p-4 flex justify-center items-center h-screen bg-gradient-to-r from-gray-900 to-gray-600">
      <div className="border p-8 rounded-lg bg-white shadow-2xl max-w-sm w-full transition-all duration-300 hover:scale-105">
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Welcome Back!</h2>
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Username Input */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border rounded p-3 w-full text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 h-9"
              placeholder="Enter username"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded p-3 w-full text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 h-9"
              placeholder="Enter password"
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg hover:bg-gray-500 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
