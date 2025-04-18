import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    age: '',
    gender: '',
    phone: '',
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'password') evaluatePasswordStrength(value);
  };

  const evaluatePasswordStrength = (password) => {
    const strong = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const medium = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/;

    if (strong.test(password)) setPasswordStrength('strong');
    else if (medium.test(password)) setPasswordStrength('medium');
    else setPasswordStrength('weak');
  };

  const validateForm = () => {
    const { phone, email, password, age } = formData;

    if (!/^\d{10}$/.test(phone)) {
      setMessage('Phone number must be exactly 10 digits.');
      return false;
    }
    if (!/@/.test(email)) {
      setMessage('Email must contain "@".');
      return false;
    }
    if (!age) {
      setMessage('Age is required.');
      return false;
    }
    if (!/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(password)) {
      setMessage('Password must be alphanumeric and contain at least 1 special character. For example: Hello@123');
      return false;
    }
    return true;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', formData);
      setMessage(res.data.message || 'Signup successful');
      setTimeout(() => navigate('/auth'), 2000); // redirect to login after 2s
    } catch (err) {
      setMessage(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <form onSubmit={handleSignup} className="space-y-4">
      <h2 className="text-2xl font-bold text-center text-red-600 mb-4">Signup Form</h2>

      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
        required
      />
      <input
        type="number"
        name="age"
        placeholder="Age"
        value={formData.age}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
        required
      />

      <select
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
        required
      >
        <option value="">Select Gender</option>
        <option value="female">Female</option>
        <option value="male">Male</option>
        <option value="non-binary">Non-binary</option>
        <option value="prefer-not-to-say">Prefer not to say</option>
      </select>

      <input
        type="text"
        name="phone"
        placeholder="Phone"
        value={formData.phone}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
        required
      />

      {formData.password && (
        <div className="text-sm font-medium">
          <span>Password Strength: </span>
          <span className={`text-${passwordStrength === 'strong' ? 'green' : passwordStrength === 'medium' ? 'yellow' : 'red'}-500`}>
            {passwordStrength.charAt(0).toUpperCase() + passwordStrength.slice(1)}
          </span>
        </div>
      )}

      <button type="submit" className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition">
        Create Account
      </button>

      {message && <p className="text-center text-sm text-red-500">{message}</p>}
    </form>
  );
};

export default Signup;
