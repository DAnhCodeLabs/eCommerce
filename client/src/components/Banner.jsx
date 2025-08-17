import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination } from "swiper/modules";
import { assets } from "../assets/assets";

const Banner = () => {
  return (
    <div className="w-[1400px] mx-auto my-6 flex justify-center items-center gap-4">
      {/* Banner chính */}
      <div className="w-2/3 rounded-2xl overflow-hidden h-120">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          modules={[Autoplay, Pagination]}
          className="mySwiper h-full"
        >
          <SwiperSlide className="h-full bg-secondary/10 ">
            <div className="flex items-center justify-between h-full w-full p-12 gap-4">
              <div className="flex flex-col items-start justify-center w-1/2 h-full">
                <h3 className="text-xl font-semibold mb-2 text-primary">
                  Up To 50% Off
                </h3>
                <h2 className="text-3xl text-start font-bold mb-4 text-secondary">
                  For Your First Goemart Shopping
                </h2>
                <p className="text-start text-text-secondary text-base">
                  There are many variations of passages orem psum available but
                  the majority have suffered alteration in some form by injected
                  humour.
                </p>
              </div>
              <div className="flex items-center justify-center h-100 w-100">
                <img src={assets.hero1} alt="" />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="h-full bg-secondary/10 ">
            <div className="flex items-center justify-between h-full w-full p-12 gap-4">
              <div className="flex flex-col items-start justify-center w-1/2 h-full">
                <h3 className="text-xl font-semibold mb-2 text-primary">
                  Up To 50% Off
                </h3>
                <h2 className="text-3xl text-start font-bold mb-4 text-secondary">
                  For Your First Goemart Shopping
                </h2>
                <p className="text-start text-text-secondary text-base">
                  There are many variations of passages orem psum available but
                  the majority have suffered alteration in some form by injected
                  humour.
                </p>
              </div>
              <div className="flex items-center justify-center h-100 w-100">
                <img src={assets.hero2} alt="" />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="h-full bg-secondary/10 ">
            <div className="flex items-center justify-between h-full w-full p-12 gap-4">
              <div className="flex flex-col items-start justify-center w-1/2 h-full">
                <h3 className="text-xl font-semibold mb-2 text-primary">
                  Up To 50% Off
                </h3>
                <h2 className="text-3xl text-start font-bold mb-4 text-secondary">
                  For Your First Goemart Shopping
                </h2>
                <p className="text-start text-text-secondary text-base">
                  There are many variations of passages orem psum available but
                  the majority have suffered alteration in some form by injected
                  humour.
                </p>
              </div>
              <div className="flex items-center justify-center h-100 w-100">
                <img src={assets.hero3} alt="" />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="h-full bg-secondary/10 ">
            <div className="flex items-center justify-between h-full w-full p-12 gap-4">
              <div className="flex flex-col items-start justify-center w-1/2 h-full">
                <h3 className="text-xl font-semibold mb-2 text-primary">
                  Up To 50% Off
                </h3>
                <h2 className="text-3xl text-start font-bold mb-4 text-secondary">
                  For Your First Goemart Shopping
                </h2>
                <p className="text-start text-text-secondary text-base">
                  There are many variations of passages orem psum available but
                  the majority have suffered alteration in some form by injected
                  humour.
                </p>
              </div>
              <div className="flex items-center justify-center h-100 w-100">
                <img src={assets.hero4} alt="" />
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      {/* Banner phụ bên phải */}
      <div className="flex flex-col w-1/3 gap-4">
        {/* Banner 1 */}
        <div className="h-58 rounded-2xl overflow-hidden relative">
          <img
            src={assets.miniBanner1}
            alt=""
            className="h-full w-full object-cover"
          />
          {/* Text overlay */}
          <div className="absolute top-6 left-6 text-left">
            <p className="text-green-600 font-medium text-sm">
              Hot Collections
            </p>
            <h3 className="text-lg font-bold text-black leading-snug">
              Best Travel Sale <br /> Collections
            </h3>
            <button className="mt-2 text-sm font-semibold text-black border-b-2 border-black hover:text-gray-600">
              DISCOVER NOW
            </button>
          </div>
        </div>

        {/* Banner 2 */}
        <div className="h-58 rounded-2xl overflow-hidden relative">
          <img
            src={assets.miniBanner2}
            alt=""
            className="h-full w-full object-cover"
          />
          {/* Text overlay */}
          <div className="absolute top-6 left-6 text-left">
            <p className="text-green-600 font-medium text-sm">New Arrivals</p>
            <h3 className="text-lg font-bold text-black leading-snug">
              Summer Fashion <br /> Collections
            </h3>
            <button className="mt-2 text-sm font-semibold text-black border-b-2 border-black hover:text-gray-600">
              SHOP NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
