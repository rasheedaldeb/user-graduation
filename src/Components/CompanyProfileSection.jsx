import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import { StatesContext } from "../Context/Context";

const CompanyProfileSection = () => {
  const token = localStorage.getItem("token");
  const [open, setOpen] = useState(false);
  const { companyId } = useParams();
  const { setCompanyWebsite } = useContext(StatesContext);
  const navigate = useNavigate();
  // post complaint states
  const [id, setId] = useState("");
  const [content, setContent] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [success, setSuccess] = useState("");
  const [complaintError, setComplaintError] = useState("");
  // company profile data states
  const [companyProfile, setCompanyProfile] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  // fetch companyProfile api request
  useEffect(() => {
    const fetchCompanyProfile = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/auth/account/${companyId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        console.log(res);
        setCompanyProfile([res.data.data]);
        setCompanyWebsite(res.data.data.webSiteURL);
        localStorage.setItem("companyid", res.data.data.companyID);
        setId(res.data.data.companyID);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
        setIsLoading(false);
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
    fetchCompanyProfile();
  }, []);
  // post compaint api request
  const postComplaint = async (e) => {
    e.preventDefault();
    setIsSending(true);
    await axios
      .post(
        `${import.meta.env.VITE_API_URL}/api/complaint`,
        {
          companyId: id,
          content: content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        setIsSending(false);
        setOpen(false);
        setSuccess(res.data.message);
        setTimeout(() => {
          setSuccess("");
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        setIsSending(false);
        setComplaintError(err.response.data.message);
        setTimeout(() => {
          setComplaintError("");
        }, 2000);
        if (e.response.status === 401) {
          alert("انتهت صلاحية الجلسة سجل الدخول مرة اخرى");
          localStorage.removeItem("token");
          navigate("/signin");
        }
        if (e.message === "Network Error") {
          setError("لا يوجد اتصال بالانترنت");
        }
      });
  };
  return (
    <section className="flex w-[45%] items-center justify-center gap-5 pt-20 pb-10">
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
      ) : companyProfile.length !== 0 ? (
        companyProfile.map((item) => (
          <div
            className="bg-secondary flex w-[500px] flex-col items-center justify-center rounded-lg p-5"
            dir="rtl"
          >
            {/* company image and name */}
            <div className="top flex w-full flex-col items-center border-b border-white py-5">
              <img
                src={`${import.meta.env.VITE_API_URL}${item.profileImageUrl}`}
                alt="avatar"
                className="h-[150px] w-[150px] rounded-full border border-gray-200 p-3"
              />
              <h3 className="text-3xl font-bold text-white">{item.name}</h3>
            </div>
            {/* user email and number */}
            <div className="email_nomber flex w-full items-center justify-between border-b border-white py-5">
              <h4 className="text-2xl font-bold text-white">{item.email}</h4>
              <h4 className="text-2xl font-bold text-white">{item.phone}</h4>
            </div>
            <div
              className="location flex w-full items-center justify-between py-5"
              dir="rtl"
            >
              <h3 className="text-2xl font-bold text-white">عنوان الشركة:</h3>
              <p className="text-xl font-bold text-white">{item.location}</p>
            </div>
            <div className="flex flex-col items-center gap-4 py-5">
              <h3 className="text-2xl font-bold text-white">
                {" "}
                تم الانشاء بتاريخ :
              </h3>
              <p className="text-center text-2xl font-bold text-white">
                {item.createdAt}
              </p>
            </div>
            <div className="flex w-full flex-col items-center gap-3 py-5">
              {success && (
                <div className="flex items-center justify-center text-xl text-green-500">
                  {success}
                </div>
              )}

              <div className="flex items-center gap-48">
                <button
                  className="text-secondary cursor-pointer rounded-lg bg-white px-5 py-3"
                  onClick={() => setOpen(!open)}
                >
                  ارسال شكوى
                </button>
              </div>
              <form
                onSubmit={(e) => postComplaint(e)}
                className={`w-full flex-col items-center gap-6 ${open ? "flex" : "hidden"}`}
                dir="rtl"
              >
                <div className="flex w-full items-center justify-center gap-20">
                  <div className="w-full">
                    <label className="mb-2 block text-lg font-bold text-white">
                      الشكوى
                    </label>
                    <input
                      name="name"
                      type="text"
                      onChange={(e) => setContent(e.target.value)}
                      className="border-primary w-full rounded-3xl border bg-gray-100 px-4 py-3 text-lg text-gray-800 transition-all outline-none"
                      placeholder=" الشكوى"
                      required
                    />
                  </div>
                </div>
                {complaintError && (
                  <div className="flex items-center justify-center text-xl text-red-600">
                    {complaintError}
                  </div>
                )}
                <button
                  type="submit"
                  class="bg-primary mx-auto block cursor-pointer rounded-3xl border-white px-6 py-3 text-lg tracking-wider text-white"
                >
                  {isSending ? (
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
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center">
          <p className="text-secondary text-xl">لايوجد شركات</p>
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

export default CompanyProfileSection;
