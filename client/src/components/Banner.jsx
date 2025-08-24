import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination } from "swiper/modules";
import { assets } from "../assets/assets";
import SlideContent from "./SlideContent";
import { httpGet } from "../services/httpService";

const Banner = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch banners from API
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        setLoading(true);
        const response = await httpGet("/auth/get-banners");

        // Xử lý đường dẫn ảnh - thêm base URL nếu cần
        const processedBanners = response.banners.map((banner) => ({
          ...banner,
          image: banner.image.startsWith("http")
            ? banner.image
            : `${process.env.REACT_APP_API_URL || ""}${banner.image}`,
        }));

        setBanners(processedBanners);
      } catch (error) {
        console.error("Error fetching banners:", error);
        setError("Failed to load banners");
        // Fallback to static banners if API fails
        setBanners([
          {
            _id: "1",
            image: assets.hero1,
            title: "Welcome to our store",
            subTitle: "Discover amazing products",
            description: "Shop the latest trends and collections",
          },
          {
            _id: "2",
            image: assets.hero2,
            title: "Summer Collection",
            subTitle: "New arrivals",
            description: "Check out our summer specials",
          },
          {
            _id: "3",
            image: assets.hero3,
            title: "Special Offers",
            subTitle: "Limited time deals",
            description: "Don't miss out on our exclusive discounts",
          },
          {
            _id: "4",
            image: assets.hero4,
            title: "Premium Quality",
            subTitle: "Best products",
            description: "Experience the difference of quality",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  if (loading) {
    return (
      <div className="w-[95%] md:w-[1400px] mx-auto mt-10 px-4 md:px-6 md:my-6">
        <div className="w-full rounded-2xl overflow-hidden md:h-120 h-60 bg-gray-200 animate-pulse"></div>
      </div>
    );
  }

  if (error && banners.length === 0) {
    return (
      <div className="w-[95%] md:w-[1400px] mx-auto mt-10 px-4 md:px-6 md:my-6">
        <div className="w-full rounded-2xl overflow-hidden md:h-120 h-60 bg-red-100 flex items-center justify-center">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[95%] md:w-[1400px] mx-auto mt-10 px-4 md:px-6 md:my-6 flex flex-col md:flex-row justify-center items-center gap-4">
      {/* Banner chính */}
      <div className="md:w-2/3 w-full rounded-2xl overflow-hidden md:h-120 h-60">
        {banners.length > 0 ? (
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            modules={[Autoplay, Pagination]}
            className="mySwiper h-full"
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          >
            {banners.map((banner, index) => (
              <SwiperSlide
                key={banner._id || index}
                className="h-full bg-secondary/10"
              >
                <SlideContent
                  idx={index}
                  img={banner.image}
                  title={banner.title}
                  subTitle={banner.subTitle}
                  description={banner.description}
                  activeIndex={activeIndex}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="h-full bg-gray-100 flex items-center justify-center">
            <p className="text-gray-500">No banners available</p>
          </div>
        )}
      </div>

      {/* Banner phụ bên phải */}
      <div className="hidden md:flex md:flex-col md:w-1/3 w-full gap-4">
        {/* Banner 1 */}
        <div className="h-58 rounded-2xl overflow-hidden relative">
          <img
            src={assets.miniBanner1}
            alt="Hot Collections"
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
            alt="New Arrivals"
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
