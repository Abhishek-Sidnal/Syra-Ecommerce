import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../features/auth/authSlice';
import AuthForm from '../components/AuthForm';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = (formData) => {
    const { email, password } = formData;
    if (!email || !password) {
      alert('Please enter both email and password');
      return;
    }
    dispatch(login(email, password));
    navigate("/");
  };

  return (
    <AuthForm
      title="Login"
      onSubmit={handleLogin}
      isRegister={false}
      footer={
        <p>
          Don't have an account? <Link to="/register" className="text-darkPrimary hover:underline">Register</Link> here.
        </p>
      }
    />
  );
};

export default LoginPage;
