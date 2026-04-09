import React from "react";
import { NavLink } from "react-router-dom";
import { path } from "../../ultils/contant";
import { navigationItems } from "../../ultils/navigation";

const notActive = "hover:bg-accent px-4 h-full flex items-center bg-secondary";
const active = "hover:bg-accent px-4 h-full flex items-center bg-accent";

const Navigation = () => {
  return (
    <div className="w-screen flex justify-center items-center h-[40px] bg-secondary text-white">
      <div className="w-1100 flex h-full items-center text-sm font-medium">
        {navigationItems.map((item) => (
          <div
            key={item.path}
            className="h-full flex justify-center items-center"
          >
            <NavLink
              to={item.path}
              end={item.path === path.HOME}
              className={({ isActive }) => (isActive ? active : notActive)}
            >
              {item.label}
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Navigation;
