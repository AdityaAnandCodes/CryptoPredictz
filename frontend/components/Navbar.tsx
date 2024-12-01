import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  return (
    <>
      {/* Navbar for larger devices */}

      <nav className="w-full z-50 top-0 sticky items-center text-stone-500 justify-between px-5 py-3 bg-zinc-900 hidden md:flex">
        {/* Logo */}
        <div>
          <Link to="/" className="text-white text-2xl font-semibold hover:text-stone-600">
            <img className="h-auto w-44 " src="../../public/logo.png" alt="" />
          </Link>
        </div>

        {/* Center Navigation Links */}
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center text-lg hover:text-stone-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2"
            >
              <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
              <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            </svg>
            Home
          </Link>
          <Link to="/sports" className="flex items-center text-lg hover:text-stone-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2"
            >
              <path d="M11.1 7.1a16.55 16.55 0 0 1 10.9 4" />
              <path d="M12 12a12.6 12.6 0 0 1-8.7 5" />
              <path d="M16.8 13.6a16.55 16.55 0 0 1-9 7.5" />
              <path d="M20.7 17a12.8 12.8 0 0 0-8.7-5 13.3 13.3 0 0 1 0-10" />
              <path d="M6.3 3.8a16.55 16.55 0 0 0 1.9 11.5" />
              <circle cx="12" cy="12" r="10" />
            </svg>
            Sports
          </Link>
          <Link to="/reward" className="flex items-center text-lg hover:text-stone-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2"
            >
              <path d="M6 3h12l4 6-10 13L2 9Z" />
              <path d="M11 3 8 9l4 13 4-13-3-6" />
              <path d="M2 9h20" />
            </svg>
            Rewards
          </Link>
          <Link to="/affiliate" className="flex items-center text-lg hover:text-stone-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2"
            >
              <path d="m11 17 2 2a1 1 0 1 0 3-3" />
              <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
              <path d="m21 3 1 11h-2" />
              <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" />
              <path d="M3 4h8" />
            </svg>
            Affiliate
          </Link>
        </div>

        <Link to="/account" className="flex items-center text-lg hover:text-stone-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2"
          >
            <path d="M18 20a6 6 0 0 0-12 0" />
            <circle cx="12" cy="10" r="4" />
            <circle cx="12" cy="12" r="10" />
          </svg>
          Account
        </Link>
      </nav>

      {/* Bottom Navbar for small devices */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-around md:hidden bg-gray-100 shadow-lg">
        <div className="flex justify-around w-full max-w-md px-4 py-2">
          <Link to="/" className="flex flex-col items-center text-center text-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-house"
            >
              <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
              <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            </svg>
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link to="/sports" className="flex flex-col items-center text-center text-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-volleyball"
            >
              <path d="M11.1 7.1a16.55 16.55 0 0 1 10.9 4" />
              <path d="M12 12a12.6 12.6 0 0 1-8.7 5" />
              <path d="M16.8 13.6a16.55 16.55 0 0 1-9 7.5" />
              <path d="M20.7 17a12.8 12.8 0 0 0-8.7-5 13.3 13.3 0 0 1 0-10" />
              <path d="M6.3 3.8a16.55 16.55 0 0 0 1.9 11.5" />
              <circle cx="12" cy="12" r="10" />
            </svg>
            <span className="text-xs mt-1">Sports</span>
          </Link>
          <Link to="/reward" className="flex flex-col items-center text-center text-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-gift"
            >
              <path d="M6 3h12l4 6-10 13L2 9Z" />
              <path d="M11 3 8 9l4 13 4-13-3-6" />
              <path d="M2 9h20" />
            </svg>
            <span className="text-xs mt-1">Rewards</span>
          </Link>
          <Link to="/affiliate" className="flex flex-col items-center text-center text-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-users"
            >
              <path d="m11 17 2 2a1 1 0 1 0 3-3" />
              <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
              <path d="m21 3 1 11h-2" />
              <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" />
              <path d="M3 4h8" />
            </svg>
            <span className="text-xs mt-1">Affiliate</span>
          </Link>
          <Link to="/account" className="flex flex-col items-center text-center text-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-users"
            >
              <path d="M18 20a6 6 0 0 0-12 0" />
              <circle cx="12" cy="10" r="4" />
              <circle cx="12" cy="12" r="10" />
            </svg>
            <span className="text-xs mt-1">Account</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
