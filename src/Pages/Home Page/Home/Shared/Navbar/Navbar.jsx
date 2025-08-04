import React from "react";
import { NavLink } from "react-router";
import ProfastLogo from "../ProfastLogo/ProfastLogo";
import useAuth from "../../../../../Hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const handleLogout = () => {
    logOut()
      .then((result) => {
        console.log("🚀 ~ hangleLogout ~ result:", result);
      })
      .catch((error) => {
        console.log("🚀 ~ hangleLogout ~ error:", error);
      });
  };
  return (
    <div className="navbar bg-base-100 shadow-sm px-4">
      {/* Left: Logo */}
      <div className="flex-1">
        <ProfastLogo />
      </div>

      {/* Center: Home link (only on large screen) */}
      <div className="hidden lg:flex flex-1 justify-center">
        <NavLink to="/" className="btn btn-ghost normal-case">
          Home
        </NavLink>
      </div>

      {/* Right: Login & Register (only on large screen) */}
      <div className="hidden lg:flex flex-1 justify-end gap-3">
        {user ? (
          <button onClick={handleLogout} className="btn btn-ghost">Logout</button>
        ) : (
          <>
            <NavLink to="/login" className="btn btn-ghost">
              Login
            </NavLink>
            <NavLink to="/register" className="btn btn-ghost">
              Register
            </NavLink>
          </>
        )}
      </div>

      {/* Dropdown menu on small screen */}
      <div className="lg:hidden dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
          <li>
            <NavLink to="/register">Register</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
