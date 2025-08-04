import React from "react";
import { Outlet } from "react-router";
import authImage from "../../assets/authImage.png";
import ProfastLogo from "../../Pages/Home Page/Home/Shared/ProfastLogo/ProfastLogo";

const AuthLayout = () => {
  return (
    <div className="bg-[#eaeced] h-screen">
      <div className="p-12 rounded-2xl mt-7 bg-base-200">
      <div>
        <ProfastLogo />
      </div>
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="flex-1">
          <img src={authImage} className="max-w-sm rounded-lg " />
        </div>
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
    </div>
  );
};

export default AuthLayout;
