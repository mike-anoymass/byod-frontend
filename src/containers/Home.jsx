import React, { useContext, useEffect, useState } from "react";
import { LoginContext, SideNavContext } from "../reactcontext/ReactContext";
import { Route, Routes, useNavigate } from "react-router-dom";
import { LogoAndName, TopNavbar } from "../components";
import {
  NotFound,
  Dashboard,
} from ".";

import FacilityLandingPage from "./facility/FacilityLandingPage";
import SideNavbar from "../components/navbar/SideNavbar";

const Landing = () => {
  const { loginInfo } = useContext(LoginContext);
  const navigate = useNavigate();
  const [toggleMenu, setToggleMenu] = useState(true);


  useEffect(() => {
    if (!loginInfo.loginStatus) {
      navigate("/");
    }
  }, [loginInfo]);

  return (
    <SideNavContext.Provider value={{ toggleMenu, setToggleMenu }}>
      <div className="md:hidden flex py-[4px]">
        <LogoAndName />
      </div>
      <div className="w-full h-full flex flex-row p-[1px] bg-dimWhite flex-1 overflow-hidden">
        {/* side navbar */}
        {toggleMenu && <SideNavbar />}

        {/* main container */}
        <div className="w-full h-full bg-white flex flex-col">
          {/* top nav */}
          <TopNavbar/>

          <div className="w-full h-full m-1 white rounded-md shadow-sm px-[10  px] pt-[20px] relative flex items-start justify-center">
            <Routes>
              <Route path="/facilities" element={<FacilityLandingPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </div>
    </SideNavContext.Provider>
  );
};

export default Landing;
