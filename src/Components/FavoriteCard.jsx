import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StatesContext } from "../Context/Context";
import axios from "axios";
import { Oval } from "react-loader-spinner";

const FavoriteCard = ({ postItem }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { removed, setRemoved } = useContext(StatesContext);
  // remove favorite states
  const [isRemoving, setIsRemoving] = useState(false);
  // remove favorite api request
  const removeFavorite = async (id) => {
    setIsRemoving(true);
    await axios
      .delete(`${import.meta.env.VITE_API_URL}/api/favorite/removeFavorite`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          postId: id,
        },
      })
      .then((res) => {
        console.log(res);
        setIsRemoving(false);
        alert(res.data.message);
        setRemoved(!removed);
      })
      .catch((err) => {
        console.log(err);
        setIsRemoving(false);
        alert(err.response.data.message);
        if (err.status === 401) {
          alert(err.response.data.message);
          localStorage.removeItem("token");
          navigate("/signin");
        }
      });
  };
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="company flex items-center justify-between">
        <img src="/images/user.png" alt="company" />
        <Link
          to={`/company-profile/${postItem.Post.Account.id}`}
          className="text-secondary text-xl"
        >
          {postItem.Post.Account.name}
        </Link>
      </div>
      <div className="h-56 w-full">
        <img
          className="mx-auto h-full dark:hidden"
          src={`${import.meta.env.VITE_API_URL}${postItem.Post.mainImageUrl}`}
          alt="postImg"
        />
      </div>
      <div className="pt-6">
        <div className="mt-4 flex items-center justify-between gap-4">
          <p className="text-2xl leading-tight font-extrabold text-gray-900 dark:text-white">
            ${postItem.Post.salePrice}
          </p>
          <Link
            to={`/single-estate/${postItem.Post.id}`}
            type="button"
            className="bg-primary border-primary inline-flex items-center rounded-lg px-5 py-2.5 text-sm font-medium text-white"
          >
            تصفح العقار
          </Link>
        </div>
        <div className="remove mt-10">
          <button
            onClick={() => removeFavorite(postItem.postId)}
            className="bg-primary border-primary inline-flex cursor-pointer items-center rounded-lg px-5 py-2.5 text-sm font-medium text-white"
          >
            {isRemoving ? (
              <Oval
                visible={true}
                height="30"
                width="30"
                color="#fff"
                ariaLabel="oval-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            ) : (
              " ازالة من المفضلة"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FavoriteCard;
