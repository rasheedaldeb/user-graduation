import React, { useContext } from "react";
import { StatesContext } from "../Context/Context";

const TypeButtons = () => {
  const { postsType, setPostsType } = useContext(StatesContext);
  return (
    <div className="buttons flex items-center justify-between">
      <button
        onClick={() => setPostsType("villa")}
        className={`border-primary ${postsType === "villa" ? "bg-primary" : ""} flex cursor-pointer items-center gap-2 rounded-lg border px-5 py-2`}
      >
        <img
          src={
            postsType === "villa"
              ? "/images/villa-white.png"
              : "/images/villa.png"
          }
          alt="villa"
          className="w-[40px]"
        />
        <p
          className={`${postsType === "villa" ? "text-white" : "text-secondary"} text-lg font-bold`}
        >
          فيلات
        </p>
      </button>{" "}
      <button
        onClick={() => setPostsType("house")}
        className={`border-primary ${postsType === "house" ? "bg-primary" : ""} flex cursor-pointer items-center gap-2 rounded-lg border px-5 py-2`}
      >
        <img
          src={
            postsType === "house"
              ? "/images/house-white.png"
              : "/images/house.png"
          }
          alt="house"
          className="w-[40px]"
        />
        <p
          className={`${postsType === "house" ? "text-white" : "text-secondary"} text-lg font-bold`}
        >
          منازل
        </p>
      </button>{" "}
      <button
        onClick={() => setPostsType("commercial_store")}
        className={`border-primary ${postsType === "commercial_store" ? "bg-primary" : ""} flex cursor-pointer items-center gap-2 rounded-lg border px-5 py-2`}
      >
        <img
          src={
            postsType === "commercial_store"
              ? "/images/store-white.png"
              : "/images/store.png"
          }
          alt="store"
          className="w-[40px]"
        />
        <p
          className={`${postsType === "commercial_store" ? "text-white" : "text-secondary"} text-lg font-bold`}
        >
          محلات{" "}
        </p>
      </button>
      <button
        onClick={() => setPostsType("all")}
        className={`border-primary ${postsType === "all" ? "bg-primary" : ""} flex cursor-pointer items-center gap-2 rounded-lg border px-5 py-2`}
      >
        <img
          src={
            postsType === "all" ? "/images/all-white.png" : "/images/all.png"
          }
          alt="store"
          className="w-[40px]"
        />
        <p
          className={`${postsType === "all" ? "text-white" : "text-secondary"} text-lg font-bold`}
        >
          الكل{" "}
        </p>
      </button>
    </div>
  );
};

export default TypeButtons;
