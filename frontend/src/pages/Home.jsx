import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import EditProfileModal from './EditProfileModal';

const Home = () => {
  const [username, setUsername] = useState('');
  const [activeSection, setActiveSection] = useState('home');
  const [showEdit, setShowEdit] = useState(false);
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const controls = useAnimation();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser?.username) {
      setUsername(storedUser.username);
      setUserData(storedUser);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      controls.start({
        scale: [1, 1.2, 1],
        rotate: [0, 9, 0],
        transition: { duration: 0.5 },
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [controls]);

  const handleSave = async (updatedData) => {
    console.log("Updated data to save:", updatedData);
    setShowEdit(false);
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'about':
        return (
          <div className="p-6 text-gray-800 max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold text-red-600 mb-6 text-center leading-snug">
              <span className="inline-block min-w-full max-w-4xl mx-auto">
                <TypeAnimation
                  sequence={['Senthoora - “Not everyone can speak up, but Senthoora can speak for them”']}
                  wrapper="span"
                  speed={40}
                  cursor={false}
                  style={{
                    display: 'inline-block',
                    whiteSpace: 'normal',
                    textAlign: 'center',
                    width: '100%',
                  }}
                />
              </span>
            </h2>
            <p className="text-lg mb-8 text-center">
              Senthoora is an <span className="text-red-500 font-semibold">AI-powered citizen safety system</span> built by students of <b>Sri Eshwar College of Engineering.</b>
              Our goal is to simplify the process of raising complaints and getting help, especially for those who may find it difficult to approach authorities.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
                className="bg-white border-l-4 border-red-500 p-6 rounded-xl shadow"
              >
                <h3 className="text-xl font-bold text-red-500 mb-2">🌍 Vision</h3>
                <p className="text-gray-700">
                  We envision a safer society where every individual, regardless of literacy, location, or background, can easily report crimes or seek help using intuitive technology.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
                className="bg-white border-l-4 border-red-500 p-6 rounded-xl shadow"
              >
                <h3 className="text-xl font-bold text-red-500 mb-2">🎯 Mission</h3>
                <p className="text-gray-700">
                  To build a reliable and accessible AI chatbot that can understand user concerns, generate structured complaints, and route them to appropriate authorities instantly.
                </p>
              </motion.div>
            </div>

            <p className="text-center text-sm text-gray-500 italic animate-blink-interval" style={{ animationDelay: '5s' }}>
              <b>
                Designed and developed with ❤️ by dedicated Artificial Intelligence & Data Science students from Sri Eshwar College of Engineering.
              </b>
            </p>
          </div>
        );

      case 'contact':
        return (
          <div className="p-6 text-gray-800 max-w-xl mx-auto">
            <h2 className="text-3xl font-bold text-red-500 mb-4">Contact Us</h2>
            <form className="space-y-4">
              <input type="text" placeholder="Your Name" className="w-full border p-2 rounded" />
              <input type="email" placeholder="Your Email" className="w-full border p-2 rounded" />
              <textarea placeholder="Your Message" className="w-full border p-2 rounded"></textarea>
              <button type="submit" className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600">Send</button>
            </form>
          </div>
        );

      default:
        return (
          <div className="flex flex-col items-center gap-12 px-6 mt-20">
            <div className="max-w-4xl w-full text-left">
              <h1 className="text-6xl font-extrabold text-red-600 mb-4">
                Welcome to <span className="typing-text">Senthoora!</span>
              </h1>
              <p className="text-lg text-gray-700">
                <b>Your AI-powered safety system to report crimes and emergencies with ease. Built for every citizen. Made with ❤️ by students.</b>
                <br />
                An AI-powered safety platform created to make it easier for people to report problems and connect with the right authorities.
                Whether it’s an emergency or a safety concern, Senthoora helps users generate legal complaints and routes them to local police or emergency services.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white p-4 rounded-xl text-center shadow-lg shadow-red-300 border-2 border-red-100"
              >
                <img src="/ai-icon.png" alt="AI Chatbot" className="w-20 mx-auto mb-4" />
                <h3 className="font-bold text-lg text-red-600">AI Chatbot</h3>
                <p>Understands user problems with simple, human-like conversations.</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white p-4 rounded-xl text-center shadow-lg shadow-red-300 border-2 border-red-100"
              >
                <img src="/document-icon.png" alt="Complaint" className="w-20 mx-auto mb-4" />
                <h3 className="font-bold text-lg text-red-600">Structured Complaints</h3>
                <p>Automatically generates complaint format for the authorities.</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white p-4 rounded-xl text-center shadow-lg shadow-red-300 border-2 border-red-100"
              >
                <img src="/police-icon.png" alt="Routing" className="w-20 mx-auto mb-4" />
                <h3 className="font-bold text-lg text-red-600">Instant Routing</h3>
                <p>Directly connects you to local police or emergency services.</p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2 }}
              className="bg-red-50 border border-red-200 p-6 rounded-xl shadow-lg w-full max-w-3xl"
            >
              <h2 className="text-xl font-bold text-red-600 mb-4">Emergency Helplines</h2>
              <ul className="text-sm space-y-2 text-gray-800">
                <li><strong>Police:</strong> 100 / 112</li>
                <li><strong>Child Line:</strong> 1098</li>
                <li><strong>Women Helpline:</strong> 1091</li>
                <li><strong>Ambulance:</strong> 102 / 108</li>
                <li><strong>Disaster Management:</strong> 1070 / 1077</li>
                <li><strong>Fire & Rescue:</strong> 101</li>
                <li><strong>Cyber Crime:</strong> 1930</li>
                <li><strong>Senior Citizens Helpline:</strong> 14567</li>
              </ul>
            </motion.div>
          </div>
        );
    }
  };

  return (
    <div className="font-poppins min-h-screen flex flex-col bg-gradient-to-b from-pink-100 to-white">
      {/* Top Bar */}
      <div className="flex justify-between items-center p-4 bg-white shadow-md sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-full text-white flex items-center justify-center font-bold">
            {username?.[0]?.toUpperCase() || 'U'}
          </div>
          <span className="font-medium text-gray-800">Hello, {username || 'Guest'}</span>
          <button onClick={() => setShowEdit(true)} className="ml-2 text-sm text-red-500 underline">Edit Profile</button>
        </div>
        <nav className="flex gap-6 text-red-600 font-semibold">
          <button onClick={() => setActiveSection('home')} className="hover:text-red-400 hover:scale-95 transition-all duration-200 transform">Home</button>
          <button onClick={() => setActiveSection('about')} className="hover:text-red-400 hover:scale-95 transition-all duration-200 transform">About</button>
          <button onClick={() => setActiveSection('contact')} className="hover:text-red-400 hover:scale-95 transition-all duration-200 transform">Contact</button>
        </nav>
      </div>

      {/* Main Content Section */}
      <main className="py-10 flex-grow">
        {renderSection()}
      </main>

      {/* Chatbot Floating Button */}
      <motion.button
        animate={controls}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-16 right-6 bg-gradient-to-br from-pink-600 to-red-500 text-white px-6 py-3 rounded-full shadow-lg font-semibold transition-all duration-300 ease-in-out"
        onClick={() => navigate('/chatbot')}
      >
        Chat
      </motion.button>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={showEdit}
        onClose={() => setShowEdit(false)}
        userData={userData}
        onSave={handleSave}
      />

      {/* Footer */}
      <footer className="text-center py-4 text-gray-600 text-sm border-t bg-white shadow-inner">
        © {new Date().getFullYear()} <span className="font-semibold text-red-500">Senthoora</span>. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
