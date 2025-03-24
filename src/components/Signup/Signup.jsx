import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as authLogin } from '../../store/authSlice';
import { Button, Input, Logo } from '../index';
import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth';
import { useForm } from 'react-hook-form';

function Signup({ isOpen, onClose, openLoginModal }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState('');
  const [send, setSend] = useState(false);
  const [userId, setUserId] = useState(''); // Store userId for OTP verification
  const [formData, setFormData] = useState({}); // Store form data for account creation
  const [successMessage, setSuccessMessage] = useState(''); // Store success message

  const create = async (data) => {
    setError('');
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        setSuccessMessage('You have registered successfully!');
        setTimeout(() => {
          onClose(); // Close the modal after successful signup
          navigate('/'); // Redirect to home page
        }, 2000); // Close after 2 seconds
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const SENDOTP = async (data) => {
    setError('');
    try {
      const token = await authService.SendOtp(data);
      if (token) {
        setUserId(token.userId); // Store userId for OTP verification
        setFormData(data); // Store form data for account creation
        setSend(true);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const VerifyOTP = async (data) => {
    setError('');
    try {
      const verification = await authService.verifyOtp(userId, data.otp);
      if (verification) {
        // If OTP is verified, proceed with account creation
        await create({ ...formData, password: data.password });
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
              <h2 className='text-2xl font-bold'>Sign Up</h2>
              <button
                onClick={onClose}
                className='text-gray-500 hover:text-gray-700'
              >
                &times;
              </button>
            </div>

            {/* Error Message */}
            {error && <p className='text-red-600 mb-4 text-center'>{error}</p>}

            {/* Success Message */}
            {successMessage && (
              <p className='text-green-600 mb-4 text-center'>{successMessage}</p>
            )}

            {/* Signup Form */}
            {!send ? (
              <form onSubmit={handleSubmit(SENDOTP)} className='space-y-4'>
                <Input
                  label='Name: '
                  placeholder='Enter your name'
                  type='text'
                  {...register('name', {
                    required: true,
                  })}
                />
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
                <Button type='submit' className='w-full'>
                  Get OTP
                </Button>
              </form>
            ) : (
              <form onSubmit={handleSubmit(VerifyOTP)} className='space-y-4'>
                <Input
                  label='OTP: '
                  type='text'
                  placeholder='Enter your OTP'
                  {...register('otp', {
                    required: true,
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
                  Submit OTP
                </Button>
              </form>
            )}

            {/* Login Link */}
            <p className='mt-4 text-center text-gray-600'>
              Already have an account?{' '}
              <button
                onClick={openLoginModal}
                className='text-blue-600 hover:underline'
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default Signup;