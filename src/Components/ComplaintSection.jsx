import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SectionHeader from "./SectionHeader";
import { Oval } from "react-loader-spinner";
const ComplaintSection = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  // fetch complaints states
  const [myComplaints, setMyComplaints] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState("");
  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
    const fetchUserComplaints = async () => {
      setIsFetching(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/complaint/my`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        console.log(res);
        setMyComplaints(res.data.data);
        setIsFetching(false);
      } catch (e) {
        console.log(e);
        setIsFetching(false);
        if (e.status === 401) {
          alert(e.response.data.message);
          localStorage.removeItem("token");
          navigate("/signin");
        }
        if (e.message === "Network Error") {
          setError("لا يوجد اتصال بالانترنت");
        }
      }
    };
    fetchUserComplaints();
  }, []);
  return (
    <section className="flex min-h-screen flex-col gap-10 px-10 pt-32">
      <SectionHeader title="الشكاوي الخاصة بي" />
      <input
        type="text"
        placeholder="ابحث عن الشركة"
        className="border-primary h-[50px] w-full rounded-3xl border px-3 outline-none"
        dir="rtl"
        onChange={(e) => setInputValue(e.target.value)}
      />
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
      ) : myComplaints.length !== 0 ? (
        <div className="complaints max-h-screen overflow-y-scroll" dir="rtl">
          {myComplaints
            .filter((item) =>
              item.Company.Account.name
                .toLowerCase()
                .includes(inputValue.toLowerCase()),
            )
            .map((item) => (
              <div className="complaint border-primary flex items-center justify-between border-b pb-3">
                <div className="name flex flex-col items-center gap-3">
                  <h4 className="text-primary text-xl font-bold">اسم الشركة</h4>
                  <p className="text-secondary text-lg font-bold">
                    {item.Company.Account.name}
                  </p>
                </div>
                <div className="email flex flex-col items-center gap-3">
                  <h4 className="text-primary text-xl font-bold">
                    بريد الشركة
                  </h4>
                  <p className="text-secondary text-lg font-bold">
                    {item.Company.Account.email}
                  </p>
                </div>
                <div className="phone flex flex-col items-center gap-3">
                  <h4 className="text-primary text-xl font-bold">رقم الشركة</h4>
                  <p className="text-secondary text-lg font-bold">
                    {item.Company.Account.phone}
                  </p>
                </div>
                <div className="complaint-content flex w-[30%] flex-col items-center gap-3">
                  <h4 className="text-primary text-xl font-bold">الشكوى</h4>
                  <p className="text-secondary text-lg font-bold">
                    {item.content}
                  </p>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <p className="text-secondary text-xl">لا يوجد شكاوي</p>
        </div>
      )}
      {error && (
        <div className="flex items-center justify-center text-xl text-red-600">
          {error}
        </div>
      )}
    </section>
  );
};

export default ComplaintSection;
