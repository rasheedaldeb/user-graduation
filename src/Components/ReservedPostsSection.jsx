import { useNavigate } from "react-router-dom";
import SectionHeader from "./SectionHeader";
import { useEffect, useState } from "react";
import axios from "axios";
import { Oval } from "react-loader-spinner";
const ReservedPostsSection = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  // reserved posts states
  const [reservedPosts, setReservedPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  // reserved posts api request
  useEffect(() => {
    const fetchReservedPosts = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/reservation/my`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        console.log(res);
        setReservedPosts(res.data.data);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
        setIsLoading(false);
        if (e.response.status === 401) {
          alert(e.response.data.message);
          localStorage.removeItem(" token");
          navigate("/signin");
        }
        if (e.message === "Network Error") {
          setError("لا يوجد اتصال بالانترنت");
        }
      }
    };
    fetchReservedPosts();
  }, []);
  return (
    <section className="flex min-h-screen flex-col gap-10 px-10 pt-32">
      <SectionHeader title="حجوزاتي" />
      <div className="registered max-h-screen overflow-y-scroll" dir="rtl">
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
        ) : reservedPosts.length !== 0 ? (
          reservedPosts.map((item) => (
            <div className="border-primary flex items-center justify-around border-b pb-3">
              <div className="image">
                <img
                  src={`${import.meta.env.VITE_API_URL}${item.Post.mainImageUrl}`}
                  alt="post-image"
                  className="h-[150px] w-[150px] rounded-xl"
                />
              </div>
              <div className="content flex items-center gap-8" dir="rtl">
                <div className="flex flex-col items-start gap-3">
                  <div className="name flex items-start gap-2">
                    <h4 className="text-primary text-xl font-bold">
                      نوع العقار:
                    </h4>
                    <p className="text-secondary text-lg font-bold">
                      {item.Post.type}
                    </p>
                  </div>
                  <div className="deposit flex items-start gap-2">
                    <h4 className="text-primary text-xl font-bold">
                      سعر الرعبون:
                    </h4>
                    <p className="text-secondary text-lg font-bold">
                      {item.Post.deposit}$
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-start gap-3">
                  <div className="price-rent flex items-center gap-2">
                    <h4 className="text-primary text-xl font-bold">
                      سعر الأيجار :
                    </h4>
                    <p className="text-secondary text-lg font-bold">
                      {item.Post.rentPrice}$
                    </p>
                  </div>
                  <div className="price-sale flex items-start gap-2">
                    <h4 className="text-primary text-xl font-bold">
                      سعر البيع :
                    </h4>
                    <p className="text-secondary text-lg font-bold">
                      {item.Post.salePrice}$
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-start gap-3">
                  <div className="price-rent flex items-center gap-2">
                    <h4 className="text-primary text-xl font-bold">
                      اسم الشركة :
                    </h4>
                    <p className="text-secondary text-lg font-bold">
                      {item.Post.Account.name}
                    </p>
                  </div>
                  <div className="price-sale flex items-start gap-2">
                    <h4 className="text-primary text-xl font-bold">
                      رقم الشركة :
                    </h4>
                    <p className="text-secondary text-lg font-bold">
                      {item.Post.Account.phone}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center">
            <p className="text-secondary text-xl">لا يوجد حجوزات</p>
          </div>
        )}
        {error && (
          <div className="flex items-center justify-center text-xl text-red-600">
            {error}
          </div>
        )}
      </div>
    </section>
  );
};

export default ReservedPostsSection;
