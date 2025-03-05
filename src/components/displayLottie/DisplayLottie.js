import React, { Suspense } from "react";
import Lottie from "react-lottie";
import Loading from "../../containers/loading/Loading";

const DisplayLottie = ({ animationData, width = "600px", height = "600px" }) => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData
    };

    return (
        <div style={{ width, height }}>
            <Suspense fallback={<Loading />}>
                {/* To override default onClick pause by Lottie */}
                <div onClick={() => null}>
                    <Lottie options={defaultOptions} height={height} width={width} />
                </div>
            </Suspense>
        </div>
    );
}

export default DisplayLottie;
