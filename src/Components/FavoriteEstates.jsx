import "./EstatesCards/EstatesCards.css";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
// import required modules
import { Navigation } from "swiper/modules";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import FavoriteCard from "./FavoriteCard";
import SectionHeader from "./SectionHeader";
import { StatesContext } from "../Context/Context";
// import required modules
const FavoriteEstates = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { removed } = useContext(StatesContext);
  // fetch favorite states
  const [favoritePosts, setFavoritePosts] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState("");
  // fetch favorite api request
  useEffect(() => {
    const fetchFavorite = async () => {
      setIsFetching(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/favorite/myFavorites`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        console.log(res.data.data);
        setFavoritePosts(res.data.data);
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
          setIsFetching(false);
        }
      }
    };
    fetchFavorite();
  }, [removed]);
  return (
    <div className="flex min-h-screen flex-col gap-10 pt-32 pb-20">
      <SectionHeader title="المنشورات المفضلة" />
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
        <div className="grid grid-cols-3 gap-10 px-[40px]">
          {favoritePosts.length !== 0 ? (
            favoritePosts.map((item) => (
              <>
                <FavoriteCard postItem={item} />
              </>
            ))
          ) : (
            <div className="flex items-center justify-center">
              <p className="text-secondary text-xl">لايوجد منشورات مفضلة</p>
            </div>
          )}
        </div>
      )}
      {error && (
        <div className="flex items-center justify-center text-xl text-red-500">
          {error}
        </div>
      )}
    </div>
  );
};

export default FavoriteEstates;
