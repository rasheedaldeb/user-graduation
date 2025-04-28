import { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "./SingleEstateSectionImages.css";
// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Oval } from "react-loader-spinner";
const SingleEstateSection = ({ images, isLoading, error }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <section className="estate-images mt-10 flex h-full w-[45%] flex-col items-center gap-12">
      {/* Estate images */}
      {isLoading ? (
        <div className="flex items-center justify-center">
          <Oval
            visible={true}
            height="40"
            width="40"
            color="rgb(23, 43, 78)"
            ariaLabel="oval-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : (
        <Swiper
          style={{
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          }}
          spaceBetween={10}
          navigation={true}
          loop={true}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper2 mx-auto flex h-[300px] w-full items-center justify-center"
        >
          {images.map((item) => (
            <SwiperSlide className="h-[50%] w-[25%] bg-cover bg-center">
              <img
                src={`${import.meta.env.VITE_API_URL}${item.imageUrl}`}
                alt="image"
                className="h-full w-full rounded-lg object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper h-[200px] w-full"
      >
        {images.map((item) => (
          <SwiperSlide>
            <img
              src={`${import.meta.env.VITE_API_URL}${item.imageUrl}`}
              className="rounded-lg"
              alt="image"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      {error && (
        <div className="flex items-center justify-center text-xl font-bold text-red-600">
          {error}
        </div>
      )}
    </section>
  );
};

export default SingleEstateSection;
