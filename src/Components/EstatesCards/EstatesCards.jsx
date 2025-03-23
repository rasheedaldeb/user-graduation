import { useNavigate } from "react-router-dom";
import EstatesCard from "../EstatesCard";
import { useEffect, useState } from "react";
import axios from "axios";
import "./EstatesCards.css";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
// import required modules
import { Navigation } from "swiper/modules";
import { Oval } from "react-loader-spinner";
const EstatesCards = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  // fetch all posts states
  const [allPosts, setAllPosts] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState("");
  // fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      setIsFetching(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/post`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        console.log(res);
        setAllPosts(res.data.data);
        setIsFetching(false);
      } catch (e) {
        console.log(e);
        if (e.status === 401) {
          alert(e.response.data.message);
          localStorage.removeItem("token");
          navigate("/signin");
        }
        if (e.message === "Network Error") {
          setError("لايوجد اتصال بالانترنت");
        }
      }
    };
    fetchPosts();
  }, []);
  return (
    <>
      {isFetching ? (
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
          {allPosts.length !== 0 ? (
            allPosts.map((item) => (
              <SwiperSlide>
                <EstatesCard postItem={item} />
              </SwiperSlide>
            ))
          ) : (
            <div className="flex items-center justify-center">
              <p className="text-secondary text-xl">لايوجد منشورات</p>
            </div>
          )}
          {error && (
            <div className="flex items-center justify-center text-xl text-red-500">
              {error}
            </div>
          )}
        </Swiper>
      )}
    </>
  );
};

export default EstatesCards;
