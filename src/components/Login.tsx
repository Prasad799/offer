import React, { useState } from 'react';
import { postData } from '../constants';

interface LoginData {
  email: string;
  password: string;
}

interface User {
  _id: string;
  file_url: string;
  email: string;
  password: string;
  name: string;
  uploadedAt: string;
  createdAt: string;
  __v: number;
}

const Login = ({ onLogin }: { onLogin: (data: User) => void }) => {
  const [formData, setFormData] = useState<LoginData>({
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await postData<User>('/verify_user', {
        email: formData.email,
        password: formData.password
      });
      onLogin(response.upload);
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return (
    <div className="w-full max-w-md p-4 sm:p-8 bg-white/60 backdrop-blur-lg rounded-2xl shadow-xl animate-fade-in">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-black text-center">
        Login to IBM
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border-0 bg-gray-50/80 rounded-xl px-3 sm:px-4 py-2 sm:py-3 focus:ring-2 focus:ring-black focus:outline-none transition-all duration-300"
            placeholder="your@email.com"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border-0 bg-gray-50/80 rounded-xl px-3 sm:px-4 py-2 sm:py-3 focus:ring-2 focus:ring-black focus:outline-none transition-all duration-300"
            placeholder="Enter your password"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#006699] text-white py-2 sm:py-3 px-4 sm:px-6 rounded-xl text-sm sm:text-base
            hover:bg-blue-700 transform hover:scale-[1.02] transition-all duration-300
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
