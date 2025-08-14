import React from "react";
import loading from "../../../../../assets/json/DeliverySpinner.json";
import Lottie from "lottie-react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-40 h-40">
        <Lottie animationData={loading} loop={true}></Lottie>
      </div>
    </div>
  );
};

export default Loading;
