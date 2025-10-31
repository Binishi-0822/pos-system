import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { sideBarOptions } from "../utils/SideBarOptions";
import { useAuth } from "../context/AuthContext";
import { LuLogIn } from "react-icons/lu";
import { IoSettings } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";

const SideBar = () => {
  const { user } = useAuth();
  const sideBarMenuList = sideBarOptions[user.role];
  const [active, setActive] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* 🔹 Hamburger button for mobile */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-secondary-color-1 text-3xl"
        >
          {isOpen ? <IoClose /> : <GiHamburgerMenu />}
        </button>
      </div>

      {/* 🔹 Sidebar container */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-primary-color-2 flex flex-col justify-between transform transition-transform duration-300 z-40
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:static md:w-64`}
      >
        <div className="flex flex-col flex-1 overflow-y-auto">
          <p className="text-secondary-color-1 text-2xl text-center pt-10 pb-5">
            POS System
          </p>
          <div className="flex-1">
            {sideBarMenuList.map((option, index) => (
              <NavLink
                key={index}
                to={option.path}
                className="bg-primary-color-2 hover:bg-primary-color-1 rounded-lg flex items-center gap-3 pl-5 pt-3 pb-3 mx-3"
                onClick={() => {
                  setActive(index);
                  setIsOpen(false); // close sidebar on mobile when a link is clicked
                }}
              >
                <option.icon
                  className={`${
                    active === index
                      ? "text-secondary-color-3"
                      : "text-secondary-color-1"
                  }`}
                />
                <span
                  className={`${
                    active === index
                      ? "text-secondary-color-3"
                      : "text-secondary-color-1"
                  }`}
                >
                  {option.title}
                </span>
              </NavLink>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <NavLink
            to="/settings"
            className="bg-primary-color-2 hover:bg-primary-color-1 rounded-lg flex items-center gap-3 px-5 py-3 mx-3 mb-2"
            onClick={() => setIsOpen(false)}
          >
            <IoSettings className="text-secondary-color-1" />
            <span className="text-secondary-color-1">Settings</span>
          </NavLink>

          <NavLink
            to="/login"
            className="bg-primary-color-2 hover:bg-primary-color-1 rounded-lg flex items-center gap-3 px-5 py-3 mx-3"
            onClick={() => setIsOpen(false)}
          >
            <LuLogIn className="text-secondary-color-1" />
            <span className="text-secondary-color-1">Log Out</span>
          </NavLink>
        </div>
      </div>

      {/* 🔹 Background overlay when sidebar is open (mobile only) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default SideBar;
