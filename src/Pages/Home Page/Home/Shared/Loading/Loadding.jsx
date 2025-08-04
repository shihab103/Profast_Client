import React from 'react';
import loading from './DeliverySpinner.json'
import Lottie from 'lottie-react';

const Loading = () => {
    return (
        <div>
            <Lottie animationData={loading} loop={true}></Lottie>
        </div>
    );
};

export default Loading;