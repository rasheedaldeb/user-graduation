import React, { useContext } from "react";
import { StatesContext } from "../Context/Context";
import { usePostFilter } from "../Hooks/FilterCustomHook";

const TypeButtons = () => {
  const { postsType, setPostsType } = useContext(StatesContext);
  const { setFilters } = usePostFilter();
  return (
    <div className="buttons flex items-center justify-center gap-32">
      <button
        onClick={() => {
          setPostsType("villa"), setFilters({ type: "villa" });
        }}
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
        onClick={() => {
          setPostsType("house"), setFilters({ type: "house" });
        }}
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
        onClick={() => {
          setPostsType("commercial_store"),
            setFilters({ type: "commercial_store" });
        }}
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
    </div>
  );
};

export default TypeButtons;
