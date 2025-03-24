import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as authLogin } from '../../store/authSlice';
import { Button, Input, Logo } from '../index';
import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth';
import { useForm } from 'react-hook-form';

function Login({ isOpen, onClose, openSignupModal }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState('');

  const login = async (data) => {
    setError('');
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate('/');
        onClose(); // Close the modal after successful login
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      {/* Modal Overlay */}
      {isOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          {/* Modal Content */}
          <div className='bg-white rounded-lg p-8 w-full max-w-md mx-4 shadow-lg'>
            <div className='mb-4 flex justify-center'>
              <Logo width='70px' /> {/* Add Logo */}
            </div>
            <div className='mb-4 flex justify-between items-center'>
              <h2 className='text-2xl font-bold'>Sign In</h2>
              <button
                onClick={onClose}
                className='text-gray-500 hover:text-gray-700'
              >
                &times;
              </button>
            </div>

            {/* Error Message */}
            {error && <p className='text-red-600 mb-4 text-center'>{error}</p>}

            {/* Login Form */}
            <form onSubmit={handleSubmit(login)} className='space-y-4'>
              <Input
                label='Email: '
                placeholder='Enter your email'
                type='email'
                {...register('email', {
                  required: true,
                  validate: {
                    matchPatern: (value) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                      'Email address must be a valid address',
                  },
                })}
              />
              <Input
                label='Password: '
                type='password'
                placeholder='Enter your password'
                {...register('password', {
                  required: true,
                })}
              />
              <Button type='submit' className='w-full'>
                Sign In
              </Button>
            </form>

            {/* Sign Up Link */}
            <p className='mt-4 text-center text-gray-600'>
              Don&apos;t have an account?{' '}
              <button
                onClick={openSignupModal}
                className='text-blue-600 hover:underline'
              >
                Sign Up
              </button>
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;