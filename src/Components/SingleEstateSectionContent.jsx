import axios from "axios";
import React, { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import { Link, useNavigate, useParams } from "react-router-dom";

const SingleEstateSectionContent = () => {
  const token = localStorage.getItem("token");
  const { postId } = useParams();
  const [openConfirm, setOpenConfirm] = useState(false);
  const navigate = useNavigate();
  // add to favorite states
  const [isAdding, setIsAdding] = useState(false);
  const [addSuccess, setAddSuccess] = useState("");
  const [addError, setAddError] = useState("");
  const [added, setAdded] = useState(false);
  // reserve states
  const [email, setEmail] = useState("");
  const [isReserving, setIsReserving] = useState(false);
  const [reserveError, setReserveError] = useState("");
  const [reserveSuccess, setReserveSuccess] = useState("");
  // fetch post details states
  const [postDetails, setPostDetails] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState("");
  // reserve post api request
  const reservePost = async (e, id, type) => {
    e.preventDefault();
    setIsReserving(true);
    await axios
      .post(
        `${import.meta.env.VITE_API_URL}/api/reservation`,
        {
          email: email,
          postId: id,
          type: type,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        console.log(res);
        setReserveSuccess(res.data.message);
        setIsReserving(false);
        setTimeout(() => {
          setReserveSuccess("");
          navigate("/");
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        setReserveError(err.response.data.error);
        setIsReserving(false);
        setTimeout(() => {
          setReserveError("");
        }, 2000);
        if (err.status === 401) {
          alert(err.response.data.message);
          localStorage.removeItem("token");
          navigate("/signin");
        }
        if (err.message === "Network Error") {
          setIsReserving(false);
          setError("لايوجد اتصال بالانترنت");
        }
      });
  };
  // post details api request
  useEffect(() => {
    const fetchPostDetails = async () => {
      setIsFetching(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/post/${postId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        console.log(res);
        setPostDetails([res.data.data]);
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
    fetchPostDetails();
  }, [added]);
  // add to favorite api request
  const addToFavorite = async (id) => {
    setIsAdding(true);
    await axios
      .post(
        `${import.meta.env.VITE_API_URL}/api/favorite`,
        {
          postId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        console.log(res);
        setIsAdding(false);
        setAddSuccess(res.data.message);
        setTimeout(() => {
          setAdded(!added);
          setAddSuccess("");
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        setAddError(err.response.data.message);
        setIsAdding(false);
        setTimeout(() => {
          setAddError("");
        }, 2000);
        if (err.status === 401) {
          alert(err.response.data.message);
          localStorage.removeItem("token");
          navigate("/signin");
        }
        if (err.message === "Network Error") {
          setError("لايوجد اتصال بالانترنت");
        }
      });
  };
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
        <>
          {postDetails.map((item) => (
            <section className="mt-32 flex w-[45%] flex-col items-center gap-5">
              <div className="top border-primary flex w-full flex-col items-center gap-5 border-b pb-3">
                <div className="flex w-full items-center justify-between">
                  <img src="/images/user.png" alt="company" />
                  <Link
                    to={`/company-profile/${item.Account.id}`}
                    className="text-secondary text-xl"
                  >
                    {item.Account.name}
                  </Link>
                </div>
              </div>
              <div className="name flex w-full flex-col items-center gap-5">
                <div className="flex w-full items-center justify-between">
                  <p className="text-primary text-lg">{item.type}</p>
                  <h3 className="text-primary text-center text-xl font-bold">
                    نوع العقار
                  </h3>
                </div>
                <div className="prices border-primary flex w-full items-center justify-between border-b pb-3">
                  {item.rentPrice && (
                    <div className="rent flex flex-col items-center gap-2">
                      <h4 className="text-secondary text-xl">سعر الايجار</h4>
                      <p className="text-primary text-lg">{item.rentPrice}$</p>
                    </div>
                  )}
                  {item.salePrice && (
                    <div className="sale flex flex-col items-center gap-2">
                      <h4 className="text-secondary text-xl">سعر البيع</h4>
                      <p className="text-primary text-lg">{item.salePrice}$</p>
                    </div>
                  )}
                  <div className="flex flex-col items-center gap-2">
                    <h4 className="text-secondary text-xl">رعبون الحجز</h4>
                    <p className="text-primary text-lg">{item.deposit}$</p>
                  </div>
                </div>
                <div className="space-floor border-primary flex w-full items-center justify-between border-b pb-3">
                  {item.CommercialStoreOrHouse && (
                    <div className="space" dir="rtl">
                      <h4 className="text-secondary text-xl">المساحة</h4>
                      <p className="text-primary text-lg">
                        {" "}
                        {item.CommercialStoreOrHouse.area}متر
                      </p>
                    </div>
                  )}
                  <div className="floor" dir="rtl">
                    <h4 className="text-secondary text-xl">العنوان</h4>
                    <p className="text-primary text-lg">
                      {" "}
                      {item.CommercialStoreOrHouse &&
                        item.CommercialStoreOrHouse.location}
                      {item.Villa && item.Villa.location}
                    </p>
                  </div>
                  <div className="created-at">
                    <h4 className="text-secondary text-xl">تاريخ النشر</h4>
                    <p className="text-primary text-lg">
                      {item.CommercialStoreOrHouse &&
                        item.CommercialStoreOrHouse.createdAt}
                      {item.Villa && item.Villa.createdAt}
                    </p>
                  </div>
                </div>
                <div className="border-primary flex w-full items-center justify-between gap-5 border-b pb-3">
                  <div className="flex w-[45%] flex-col items-center gap-2">
                    <h3 className="text-primary text-center text-2xl font-bold">
                      الوصف
                    </h3>
                    <p className="text-primary text-lg">
                      {item.CommercialStoreOrHouse &&
                        item.CommercialStoreOrHouse.description}
                      {item.Villa && item.Villa.description}
                    </p>
                  </div>
                  {item.Villa && (
                    <div className="flex flex-col items-center gap-2" dir="rtl">
                      <div className="landArea flex items-center gap-2">
                        <h4 className="text-secondary text-xl">مساحة الارض</h4>
                        <p className="text-primary text-lg">
                          {item.Villa.landArea}
                        </p>
                      </div>
                      <div className="landArea flex items-center gap-2">
                        <h4 className="text-secondary text-xl">مساحة الفيلا</h4>
                        <p className="text-primary text-lg">
                          {item.Villa.buildingArea}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {addSuccess && (
                <div className="flex items-center justify-center text-xl text-green-500">
                  {addSuccess}
                </div>
              )}
              {addError && (
                <div className="flex items-center justify-center text-xl text-red-500">
                  {addError}
                </div>
              )}
              {reserveSuccess && (
                <div className="flex items-center justify-center text-xl text-green-500">
                  {reserveSuccess}
                </div>
              )}
              {reserveError && (
                <div className="flex items-center justify-center text-xl text-red-500">
                  {reserveError}
                </div>
              )}
              <div className="button flex w-full flex-col gap-7">
                <div className="flex w-full items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setOpenConfirm(!openConfirm)}
                    class="bg-primary hover:bg-secondary block cursor-pointer rounded-3xl px-10 py-3 text-lg tracking-wider text-white"
                  >
                    دفع رعبون و حجز
                  </button>
                  <button
                    onClick={() => addToFavorite(item.id)}
                    type="button"
                    class="bg-primary hover:bg-secondary block cursor-pointer rounded-3xl px-10 py-3 text-lg tracking-wider text-white"
                  >
                    {isAdding ? (
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
                      " اضافة الى المفضلة"
                    )}
                  </button>
                </div>
                <form
                  onSubmit={(e) => reservePost(e, item.id, item.type)}
                  className={`${openConfirm ? "flex" : "hidden"} flex flex-col gap-5`}
                  dir="rtl"
                >
                  <div>
                    <label className="text-secondary mb-2 block text-lg font-bold">
                      البريد الالكتروني
                    </label>
                    <input
                      name="email"
                      type="text"
                      className="border-primary w-full rounded-3xl border bg-gray-100 px-4 py-3 text-lg text-gray-800 transition-all outline-none"
                      placeholder="ادخل بريدك الالكتروني"
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-primary mx-auto block cursor-pointer rounded-3xl border-white px-6 py-3 tracking-wider text-white"
                  >
                    {isReserving ? (
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
                      "تأكيد"
                    )}
                  </button>
                </form>
              </div>
            </section>
          ))}
        </>
      )}
      {error && (
        <div className="flex items-center justify-center text-xl font-bold text-red-600">
          {error}
        </div>
      )}
    </>
  );
};

export default SingleEstateSectionContent;
