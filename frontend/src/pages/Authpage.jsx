import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-rose-500 to-red-600   animation: gradientMove 10s ease infinite;
">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        
        {/* Toggle Buttons */}
        <div className="flex mb-6 justify-between bg-rose-100 rounded-lg p-1">
          <button
            className={`w-1/2 py-2 font-bold rounded-md ${
              isLogin ? 'bg-red-500 text-white' : 'text-red-600'
            }`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`w-1/2 py-2 font-bold rounded-md ${
              !isLogin ? 'bg-red-500 text-white' : 'text-red-600'
            }`}
            onClick={() => setIsLogin(false)}
          >
            Signup
          </button>
        </div>

        {/* Render form */}
        {isLogin ? <Login /> : <Signup />}
      </div>
    </div>
  );
};

export default AuthPage;
