import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { IoIosHome, IoMdLogIn } from "react-icons/io";
import { IoBarChart } from "react-icons/io5";
import { HiOutlineTableCells } from "react-icons/hi2";

import logo from "../images/logo.png";


function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 w-full">
      <div className="flex flex-wrap items-center justify-between py-4 px-10">
        {/* Header Section */}
        <NavLink to="/" className="flex items-center">
          <div>
            <h1 className="font-extrabold text-gray-900 dark:text-white text-3xl md:text-4xl lg:text-5xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-300 from-sky-400">
                CashFlow Control
              </span>
            </h1>
            <div className="flex items-center">
              <img src={logo} alt="logo" className="w-12 h-12 mr-2" />
              <p className="italic text-gray-500 dark:text-white text-sm md:text-base lg:text-lg">
                Navigate Your Finances with Confidence
              </p>
            </div>
          </div>
        </NavLink>
        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded={isOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        {/* Navigation Links */}
        <div
          className={`${isOpen ? "block" : "hidden"} w-full md:block md:w-auto`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
               <li>
              
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `block py-2 px-3 rounded text-gray-900 
                ${isActive ? "text-blue-500" : "dark:text-white"} 
                hover:bg-gray-100 
                md:hover:bg-transparent 
                md:border-0 
                md:hover:text-blue-500 
                dark:hover:bg-gray-700 
                dark:hover:text-white 
                flex items-center`
                }
              >
                <IoIosHome className="w-5 h-5 mr-2" />
                {/* Icon visible on medium screens and up */}
                Home
              </NavLink>
           </li>

           <NavLink
                to="/table"
                className={({ isActive }) =>
                  `block py-2 px-3 rounded text-gray-900 
                ${isActive ? "text-blue-500" : "dark:text-white"} 
                hover:bg-gray-100 
                md:hover:bg-transparent 
                md:border-0 
                md:hover:text-blue-500 
                dark:hover:bg-gray-700 
                dark:hover:text-white 
                flex items-center`
                }
              >
                <HiOutlineTableCells className="w-5 h-5 mr-2 " />
                {/* Icon visible on medium screens and up */}
                Table
              </NavLink>
           <li>
            <NavLink
                to="/overview"
                className={({ isActive }) =>
                  `block py-2 px-3 rounded text-gray-900 
                ${isActive ? "text-blue-500" : "dark:text-white"} 
                hover:bg-gray-100 
                md:hover:bg-transparent 
                md:border-0 
                md:hover:text-blue-500 
                dark:hover:bg-gray-700 
                dark:hover:text-white 
                flex items-center`
                }
              >
                <IoBarChart className="w-5 h-5 mr-2" />
                {/* Icon visible on medium screens and up */}
                Charts
              </NavLink>
               </li>
            
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `block py-2 px-3 rounded text-gray-900 
                ${isActive ? "text-blue-500" : "dark:text-white"} 
                hover:bg-gray-100 
                md:hover:bg-transparent 
                md:border-0 
                md:hover:text-blue-500 
                dark:hover:bg-gray-700 
                dark:hover:text-white 
                flex items-center`
                }
              >
                <IoMdLogIn className="w-5 h-5 mr-2" />
                Login
              </NavLink>
            </li>
           
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
