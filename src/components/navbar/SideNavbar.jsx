import React, { useContext, useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { AiFillHome, AiFillCloseCircle } from "react-icons/ai";

import {
  BiHelpCircle,
  BiBuildingHouse,
} from "react-icons/bi";
import { LoginContext, SideNavContext } from "../../reactcontext/ReactContext";
import Logout from "../Logout";
import { LogoAndName } from "../";

const SideNavbar = () => {
  const { loginInfo } = useContext(LoginContext);
  const { setToggleMenu } = useContext(SideNavContext);
  const [isMobile, setIsMobile] = useState(false);

  const items = [
    {
      key: "facilities",
      name: "Facilities",
      icon: <BiBuildingHouse fontSize={18} />,
    },
  ];

  const linkActiveStyles =
    "opacity-90 text-[12pt] flex flex-row item-center gap-x-2 p-2";
  const linkNotActiveStyles =
    "opacity-60 text-[11pt] flex flex-row items-center gap-x-2";

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the threshold as needed
    };

    // Initial check on component mount
    handleResize();

    // Event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      onClick={() => {
        if (isMobile) {
          setToggleMenu(false);
        }
      }}
      className="min-w-[275px] h-full flex-col overflow-hidden bg-white md:flex p-2 pl-5 gap-y-2 md:relative absolute md:top-0 top-24 z-30"
    >
      <div className="md:flex hidden">
        <LogoAndName />
      </div>

      <div className="mt-5 flex flex-col gap-y-3">
        <NavLink
          key={"dashboard"}
          to={"/dashboard"}
          className={({ isActive }) =>
            isActive ? linkActiveStyles : linkNotActiveStyles
          }
        >
          <AiFillHome fontSize={18} />
          <span>Dashboard </span>
        </NavLink>

      </div>

      <div className="mt-10 flex flex-col gap-y-3 overflow-y-auto">
        {items.map((value, key) => (
          <NavLink
            key={key}
            to={value.key}
            className={({ isActive }) =>
              isActive ? linkActiveStyles : linkNotActiveStyles
            }
          >
            {value.icon}
            <span>{value.name}</span>
          </NavLink>
        ))}
      </div>

      <div className="mt-7 flex flex-col gap-y-3">
        <NavLink
          key={"help"}
          to={"/help"}
          className={({ isActive }) =>
            isActive ? linkActiveStyles : linkNotActiveStyles
          }
        >
          <BiHelpCircle fontSize={18} />
          <span>Help </span>
        </NavLink>

        <Logout />
      </div>
    </div>
  );
};

export default SideNavbar;
