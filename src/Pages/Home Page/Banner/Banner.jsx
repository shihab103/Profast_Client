import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import img1 from '../../../assets/banner/banner1.png';
import img2 from '../../../assets/banner/banner2.png';
import img3 from '../../../assets/banner/banner3.png';

const Banner = () => {
  return (
    <div className="max-w-screen-xl mx-auto my-6 rounded-lg overflow-hidden">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        showIndicators={true}
        showArrows={true}
        interval={3000}
      >
        <div>
          <img src={img1} alt="Banner 1" />
        </div>
        <div>
          <img src={img2} alt="Banner 2" />
        </div>
        <div>
          <img src={img3} alt="Banner 3" />
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
