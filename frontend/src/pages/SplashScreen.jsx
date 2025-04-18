import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/auth');
    }, 2000); // show splash for 2 seconds
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-600">
      <h1 className="text-white text-4xl font-bold animate-pulse">Senthoora</h1>
    </div>
  );
};

export default SplashScreen;
