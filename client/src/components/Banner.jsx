import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination } from "swiper/modules";
import { assets } from "../assets/assets";
import SlideContent from "./SlideContent";

const Banner = () => {
  const [activeIndex, setActiveIndex] = useState(0);
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
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        >
          <SwiperSlide className="h-full bg-secondary/10 ">
            <SlideContent
              idx={0}
              img={assets.hero1}
              activeIndex={activeIndex}
            />
          </SwiperSlide>

          <SwiperSlide className="h-full bg-secondary/10 ">
            <SlideContent
              idx={1}
              img={assets.hero2}
              activeIndex={activeIndex}
            />
          </SwiperSlide>

          <SwiperSlide className="h-full bg-secondary/10 ">
            <SlideContent
              idx={2}
              img={assets.hero3}
              activeIndex={activeIndex}
            />
          </SwiperSlide>

          <SwiperSlide className="h-full bg-secondary/10 ">
            <SlideContent
              idx={3}
              img={assets.hero4}
              activeIndex={activeIndex}
            />
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
