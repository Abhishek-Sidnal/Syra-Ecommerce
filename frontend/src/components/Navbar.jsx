import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="bg-darkCard p-4 text-darkText shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="font-bold text-lg text-darkPrimary">
          E-Commerce
        </Link>

        {/* Hamburger Menu for Mobile */}
        <button
          className="md:hidden text-darkPrimary focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
            />
          </svg>
        </button>

        {/* Menu Items */}
        <div
          className={`${
            isMenuOpen ? 'block' : 'hidden'
          } md:flex items-center space-x-4 absolute md:static bg-darkCard md:bg-transparent w-full md:w-auto left-0 md:translate-x-0 p-4 md:p-0 top-16 md:top-0 z-10`}
        >
          {user ? (
            <>
              <Link to="/cart" className="block md:inline hover:text-darkSecondary">
                Cart
              </Link>
              <Link to="/wishlist" className="block md:inline hover:text-darkSecondary">
                Wishlist
              </Link>
              <Link to="/add-product" className="block md:inline hover:text-darkSecondary">
                Add Product
              </Link>
              <span className="block md:inline text-darkPrimary font-semibold">
                Hi, {user.username}
              </span>
              <Link to="/my-products" className="block md:inline hover:text-darkSecondary">
                My Products
              </Link>
              <button
                onClick={handleLogout}
                className="block md:inline hover:text-darkDanger text-sm font-semibold"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="block md:inline hover:text-darkSecondary">
                Login
              </Link>
              <Link to="/register" className="block md:inline hover:text-darkSecondary">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
