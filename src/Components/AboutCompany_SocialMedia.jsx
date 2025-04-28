import React, { useContext, useEffect, useState } from "react";
import SectionHeader from "./SectionHeader";
import { Link, useNavigate } from "react-router-dom";
import { StatesContext } from "../Context/Context";
import axios from "axios";
import { Oval } from "react-loader-spinner";

const AboutCompany_SocialMedia = () => {
  const token = localStorage.getItem("token");
  const { companyWebsite } = useContext(StatesContext);
  const id = localStorage.getItem("companyid");
  const navigate = useNavigate();
  // fetch aboutUs & socialMedia states
  const [aboutUs, setAboutUs] = useState([]);
  const [socialMedia, setSocialMedia] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  // fetch aboutUs  api request
  useEffect(() => {
    const fetchPrevAboutUs = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/about_us/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        console.log(res);
        setAboutUs([res.data.data]);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
        setIsLoading(false);
        if (e.response.status === 401) {
          alert("انتهت صلاحية الجلسة سجل الدخول مرة اخرى");
          localStorage.removeItem("companytoken");
          navigate("/company-signin");
        }
        if (e.message === "Network Error") {
          setError("لا يوجد اتصال بالانترنت");
        }
      }
    };
    fetchPrevAboutUs();
  }, [id]);
  // fetch social media api request
  useEffect(() => {
    const fetchPrevSocialMedia = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/socialMedia/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        console.log(res);
        setSocialMedia([res.data.data]);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
        setIsLoading(false);
        if (e.response.status === 401) {
          alert("انتهت صلاحية الجلسة سجل الدخول مرة اخرى");
          localStorage.removeItem("companytoken");
          navigate("/company-signin");
        }
        if (e.message === "Network Error") {
          setError("لا يوجد اتصال بالانترنت");
        }
      }
    };
    fetchPrevSocialMedia();
  }, [id]);
  return (
    <section className="flex w-[45%] flex-col items-center gap-5">
      <SectionHeader title="معلومات عن الشركة" />
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
      ) : aboutUs.length !== 0 ? (
        aboutUs.map((item) => (
          <div className="about-us w-full">
            <div className="border-primary flex w-full flex-col items-center gap-5 border-b pb-5">
              <h4 className="text-secondary text-xl">وصف الشركة</h4>
              <p className="text-secondary text-lg">{item.description}</p>
            </div>
            <div className="border-primary flex w-full flex-col items-center gap-5 border-b pb-5">
              <h4 className="text-secondary text-xl">هدف الشركة</h4>
              <p className="text-secondary text-lg">{item.mission}</p>
            </div>
            <div className="border-primary flex w-full flex-col items-center gap-5 border-b pb-5">
              <h4 className="text-secondary text-xl">رؤية الشركة</h4>
              <p className="text-secondary text-lg">{item.vision}</p>
            </div>
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center">
          <p className="text-secondary text-xl">لايوجد معلومات</p>
        </div>
      )}
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
      ) : socialMedia.length !== 0 ? (
        socialMedia.map((item) => (
          <div className="social flex flex-col items-center gap-5">
            <h2 className="text-secondary text-2xl font-bold">
              تواصل مع الشركة
            </h2>
            <div className="social-icons flex items-center gap-5">
              <div className="website bg-primary flex h-[50px] w-[50px] items-center justify-center rounded-full">
                <Link to={companyWebsite} target="blank">
                  <img src="/images/linkicon.png" alt="web" />
                </Link>
              </div>
              {item.facebook && (
                <div className="facebook bg-primary flex h-[50px] w-[50px] items-center justify-center rounded-full">
                  <Link to={item.facebook} target="blank">
                    <img src="/images/facebookicon.png" alt="web" />
                  </Link>
                </div>
              )}
              {item.twitter && (
                <div className="facebook bg-primary flex h-[50px] w-[50px] items-center justify-center rounded-full">
                  <Link to={item.twitter} target="blank">
                    <img src="/images/x-twitter.png" alt="web" />
                  </Link>
                </div>
              )}
              {item.instagram && (
                <div className="insta bg-primary flex h-[50px] w-[50px] items-center justify-center rounded-full">
                  <Link to={item.instagram} target="blank">
                    <img src="/images/instagramicon.png" alt="web" />
                  </Link>
                </div>
              )}
              {item.whatsapp && (
                <div className="whatsapp bg-primary flex h-[50px] w-[50px] items-center justify-center rounded-full">
                  <Link to={item.whatsapp} target="blank">
                    <img src="/images/whatsappicon.png" alt="web" />
                  </Link>
                </div>
              )}
              {item.telegram && (
                <div className="telegram bg-primary flex h-[50px] w-[50px] items-center justify-center rounded-full">
                  <Link to={item.telegram} target="blank">
                    <img src="/images/telegramicon.png" alt="web" />
                  </Link>
                </div>
              )}
              {item.linkedin && (
                <div className="linkedin bg-primary flex h-[50px] w-[50px] items-center justify-center rounded-full">
                  <Link to={item.linkedin} target="blank">
                    <img src="/images/linkedinicon.png" alt="web" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center">
          <p className="text-secondary text-xl">لايوجد روابط</p>
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

export default AboutCompany_SocialMedia;
