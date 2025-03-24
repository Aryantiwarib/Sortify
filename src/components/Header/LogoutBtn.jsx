import React from 'react';
import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth'; // Import your Appwrite auth service
import { logout } from '../../store/authSlice'; // Import the logout action

function LogoutBtn({ onLogout }) {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    authService
      .logout() // Call the Appwrite logout method
      .then(() => {
        dispatch(logout()); // Dispatch the logout action to update Redux state
        if (onLogout) onLogout(); // Call the onLogout prop to handle additional cleanup (e.g., closing modals/sidebar)
      })
      .catch((error) => {
        console.error('Logout failed:', error); // Handle any errors during logout
      });
  };

  return (
    <button
      className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;