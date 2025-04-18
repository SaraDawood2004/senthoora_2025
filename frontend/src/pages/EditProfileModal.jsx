import React, { useState, useEffect } from 'react';
import defaultAvatar from './default-avatar.png'; // Make sure this file exists

const EditProfileModal = ({ isOpen, onClose, userData, onSave }) => {
  const [formData, setFormData] = useState(userData || {});
  const [avatarPreview, setAvatarPreview] = useState('');

  useEffect(() => {
    setFormData(userData);
    setAvatarPreview(userData?.avatar || '');
  }, [userData]);

  const handleChange = (e) => {
    const { name, files } = e.target;
    if (name === 'avatar' && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result);
      reader.readAsDataURL(files[0]);
      setFormData({ ...formData, avatar: files[0] });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold text-xl"
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold text-red-600 mb-4 text-center">View Profile</h2>

        {/* Glowing Avatar */}
        <div className="flex justify-center mb-4">
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 rounded-full animate-glow bg-red-300 blur-xl opacity-70"></div>
            <img
              src={avatarPreview || defaultAvatar}
              alt="Avatar"
              className="relative w-20 h-20 rounded-full object-cover border-2 border-red-400 shadow-lg"
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="username"
            value={formData.username || ''}
            readOnly
            className="w-full border p-2 rounded bg-gray-100 cursor-not-allowed"
            placeholder="Username"
          />
          <input
            name="age"
            type="number"
            value={formData.age || ''}
            readOnly
            className="w-full border p-2 rounded bg-gray-100 cursor-not-allowed"
            placeholder="Age"
          />
          <input
            name="gender"
            value={formData.gender || ''}
            readOnly
            className="w-full border p-2 rounded bg-gray-100 cursor-not-allowed"
            placeholder="Gender"
          />
          <input
            name="phone"
            value={formData.phone || ''}
            readOnly
            className="w-full border p-2 rounded bg-gray-100 cursor-not-allowed"
            placeholder="Phone"
          />
          <input
            name="email"
            value={formData.email || ''}
            readOnly
            className="w-full border p-2 rounded bg-gray-100 cursor-not-allowed"
            placeholder="Email"
          />
          <input
            name="password"
            type="password"
            value={formData.password || ''}
            readOnly
            className="w-full border p-2 rounded bg-gray-100 cursor-not-allowed"
            placeholder="Password"
          />

          {/* Avatar Upload */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-600 font-medium">Change Avatar (optional)</label>
            <input
              name="avatar"
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="text-sm"
            />
          </div>

          <button
            type="submit"
            className="bg-red-500 hover:bg-red-600 text-white w-full py-2 rounded font-semibold"
          >
            Done
          </button>
        </form>
      </div>

      {/* Custom Glow Animation */}
      <style>
        {`
          @keyframes glow {
            0%, 100% {
              transform: scale(1);
              opacity: 0.6;
            }
            50% {
              transform: scale(1.1);
              opacity: 0.9;
            }
          }

          .animate-glow {
            animation: glow 2s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
};

export default EditProfileModal;
