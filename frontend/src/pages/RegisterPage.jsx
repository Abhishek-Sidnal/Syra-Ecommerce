import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register } from '../features/auth/authSlice'; 
import AuthForm from '../components/AuthForm';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = (formData) => {
    const { username, email, password } = formData;
    if (!username || !email || !password) {
      alert('Please fill in all fields');
      return;
    }
    dispatch(register(formData));
    navigate('/login')
  };

  return (
    <AuthForm
      title="Register"
      onSubmit={handleRegister}
      isRegister={true}
      footer={
        <p>
          Already have an account? <Link to="/login" className="text-darkPrimary hover:underline">Login</Link> here.
        </p>
      }
    />
  );
};

export default RegisterPage;
