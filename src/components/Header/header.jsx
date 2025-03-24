import React, { useState } from 'react';
import { Container, Logo, LogoutBtn } from '../index';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Login from '../Login/Login'; // Import the Login component
import Signup from '../Signup/Signup'; // Import the Signup component

function Header() {
  const authStatus = useSelector((state) => state.auth.status); // Get authentication status from Redux store
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // State for Login modal
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false); // State for Signup modal

  const navItems = [
    {
      name: 'Home',
      slug: '/',
      active: true,
    },
    {
      name: 'Login',
      slug: '#', // Use '#' to prevent navigation
      active: !authStatus,
      onClick: () => {
        setIsLoginModalOpen(true); // Open Login modal
        setIsSignupModalOpen(false); // Close Signup modal
      },
    },
    {
      name: 'Signup',
      slug: '#', // Use '#' to prevent navigation
      active: !authStatus,
      onClick: () => {
        setIsSignupModalOpen(true); // Open Signup modal
        setIsLoginModalOpen(false); // Close Login modal
      },
    },  
    {
      name: 'About',
      slug: '/about',
      active: authStatus,
    },
    {
      name: 'Add Post',
      slug: '/add-post',
      active: authStatus,
    },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Function to handle logout actions
  const handleLogout = () => {
    setIsLoginModalOpen(false); // Close Login modal
    setIsSignupModalOpen(false); // Close Signup modal
    setIsSidebarOpen(false); // Close Sidebar
    navigate('/'); // Redirect to home page
  };

  return (
    <header className='py-3 shadow bg-gray-100 text-black'>
      <Container>
        <nav className='flex items-center justify-between'>
          {/* Logo */}
          <div className='mr-4'>
            <Link to='/'>
              <Logo width='70px' />
            </Link>
          </div>

          {/* Hamburger Menu (Mobile Only) */}
          <button
            onClick={toggleSidebar}
            className='block md:hidden text-2xl focus:outline-none'
          >
            ☰
          </button>

          {/* Desktop Navbar */}
          <ul className='hidden md:flex ml-auto'>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={item.onClick || (() => navigate(item.slug))}
                    className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 hover:text-black rounded-full'
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn onLogout={handleLogout} />
              </li>
            )}
          </ul>

          {/* Mobile Sidebar */}
          <div
            className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity ${
              isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            } md:hidden`}
            onClick={toggleSidebar}
          >
            <div
              className={`fixed inset-y-0 left-0 w-64 bg-white text-black transform transition-transform ${
                isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className='p-4 border-b'>
                <Link to='/'>
                  <Logo width='70px' />
                </Link>
              </div>
              <ul className='p-4'>
                {navItems.map((item) =>
                  item.active ? (
                    <li key={item.name} className='mb-2'>
                      <button
                        onClick={() => {
                          if (item.onClick) item.onClick();
                          else navigate(item.slug);
                          toggleSidebar();
                        }}
                        className='w-full text-left px-4 py-2 duration-200 hover:bg-blue-100 hover:text-black rounded-full'
                      >
                        {item.name}
                      </button>
                    </li>
                  ) : null
                )}
                {authStatus && (
                  <li className='mb-2'>
                    <LogoutBtn onLogout={handleLogout} />
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </Container>

      {/* Login Modal */}
      <Login
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        openSignupModal={() => {
          setIsSignupModalOpen(true);
          setIsLoginModalOpen(false);
        }}
      />

      {/* Signup Modal */}
      <Signup
        isOpen={isSignupModalOpen}
        onClose={() => setIsSignupModalOpen(false)}
        openLoginModal={() => {
          setIsLoginModalOpen(true);
          setIsSignupModalOpen(false);
        }}
      />
    </header>
  );
}

export default Header;