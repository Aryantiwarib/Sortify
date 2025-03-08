import React, { useState } from 'react';
import { Container, Logo, LogoutBtn } from '../index';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    {
      name: 'Home',
      slug: '/',
      active: true,
    },
    {
      name: 'Login',
      slug: '/login',
      active: !authStatus,
    },
    {
      name: 'Signup',
      slug: '/signup',
      active: !authStatus,
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
                    onClick={() => navigate(item.slug)}
                    className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 hover:text-black rounded-full'
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
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
                          navigate(item.slug);
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
                    <LogoutBtn />
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </Container>
    </header>
  );
}

export default Header;