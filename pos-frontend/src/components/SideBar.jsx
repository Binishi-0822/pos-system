import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { sideBarOptions } from "../utils/SideBarOptions";
import { useAuth } from "../context/AuthContext";
import { LuLogIn } from "react-icons/lu";
import { IoSettings } from "react-icons/io5";

const SideBar = () => {
  const { user } = useAuth();
  const sideBarMenuList = sideBarOptions[user.role];
  const [active, setActive] = useState(0);

  return (
    <div className="bg-primary-color-2 w-64 h-screen flex flex-col justify-between fixed left-0 top-0">
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
              onClick={() => setActive(index)}
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
        >
          <IoSettings className="text-secondary-color-1" />
          <span className="text-secondary-color-1">Settings</span>
        </NavLink>

        <NavLink
          to="/login"
          className="bg-primary-color-2 hover:bg-primary-color-1 rounded-lg flex items-center gap-3 px-5 py-3 mx-3"
        >
          <LuLogIn className="text-secondary-color-1" />
          <span className="text-secondary-color-1">Log Out</span>
        </NavLink>
      </div>
    </div>
  );
};

export default SideBar;
