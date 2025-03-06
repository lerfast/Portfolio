import React, { Suspense } from "react";
import Lottie from "react-lottie";
import Loading from "../../containers/loading/Loading";
import "./DisplayLottie.css"; // We'll add a CSS file for container styling

const DisplayLottie = ({ animationData }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
  };

  return (
    // Give the container a class so we can style it
    <div className="lottie-container">
      <Suspense fallback={<Loading />}>
        {/* We can omit the inline width/height,
            letting CSS handle the scaling */}
        <div onClick={() => null}>
          <Lottie options={defaultOptions} />
        </div>
      </Suspense>
    </div>
  );
};

export default DisplayLottie;
