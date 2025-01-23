import React, { useState } from 'react';

const AuthForm = ({ title, onSubmit, isRegister, footer }) => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-darkBg min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-darkCard p-6 rounded shadow-lg text-darkText w-96">
        <h2 className="text-2xl font-bold text-darkPrimary mb-4">{title}</h2>
        {isRegister && (
          <div className="mb-4">
            <label className="block mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 rounded bg-darkBg text-darkText border border-darkPrimary"
            />
          </div>
        )}
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 rounded bg-darkBg text-darkText border border-darkPrimary"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 rounded bg-darkBg text-darkText border border-darkPrimary"
          />
        </div>
        <button type="submit" className="bg-darkPrimary text-white px-4 py-2 rounded hover:bg-purple-600 w-full">
          {title}
        </button>
        {footer && <div className="mt-4 text-center">{footer}</div>}
      </form>
    </div>
  );
};

export default AuthForm;
