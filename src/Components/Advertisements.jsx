import SectionHeader from "./SectionHeader";
import { useEffect, useState } from "react";
import axios from "axios";
import { Oval } from "react-loader-spinner";
import "./EstatesCards/EstatesCards.css";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
// import required modules
import { Navigation } from "swiper/modules";
import ModalImage from "react-modal-image";
const Advertisements = () => {
  // fetch ads states
  const [advertisements, setAdvertisements] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchAds = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/external_ad`,
        );
        console.log(res);
        setAdvertisements(res.data.data);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
        if (e.message === "Network Error") {
          setError("لايوجد اتصال بالانترنت");
          setIsLoading(false);
        }
      }
    };
    fetchAds();
  }, []);
  return (
    <section className="container flex flex-col gap-10 px-10 pt-20">
      <SectionHeader title="الاعلانات" />
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
          slidesPerView={3}
          spaceBetween={30}
          loop={true}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
          dir="rtl"
        >
          {advertisements.length !== 0 ? (
            advertisements.map((item) => (
              <div className="adv flex flex-col items-center gap-2">
                <ModalImage
                  small={`${import.meta.env.VITE_API_URL}${item.imageUrl}`}
                  large={`${import.meta.env.VITE_API_URL}${item.imageUrl}`}
                  loading="lazy"
                  alt="add"
                  className="h-[250px]"
                />
                <p className="text-secondary text-xl">{item.content}</p>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center">
              <p className="text-secondary text-xl">لايوجد اعلانات</p>
            </div>
          )}
          {error && (
            <div className="flex items-center justify-center text-xl text-red-500">
              {error}
            </div>
          )}
        </Swiper>
      )}
    </section>
  );
};

export default Advertisements;
