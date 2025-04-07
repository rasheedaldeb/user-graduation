import axios from "axios";
import { useContext, useState } from "react";
import { Oval } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { StatesContext } from "../Context/Context";
const NavBar = () => {
  const token = localStorage.getItem("token");
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();
  const { setSearch } = useContext(StatesContext);
  // logout api request
  const logout = async () => {
    setIsLoggingOut(true);
    await axios
      .post(
        `${import.meta.env.VITE_API_URL}/api/auth/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        setIsLoggingOut(false);
        console.log(res);
        localStorage.removeItem("token");
        alert(res.data.message);
        navigate("/signin");
      })
      .catch((err) => {
        if (err.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          navigate("/signin");
        }
        console.log(err);
      });
  };
  return (
    <nav
      className="border-primary fixed z-20 flex h-[80px] w-screen items-center justify-between border-b bg-white px-10 transition duration-200"
      dir="rtl"
    >
      <div className="flex items-center gap-8">
        <img
          src="/images/logo.png"
          alt="logo"
          className="h-[140px] w-[140px]"
        />
        <ul className="flex gap-8">
          <li>
            <Link
              to="/"
              className="border-secondary text-secondary pb-1 text-xl font-bold transition duration-500 hover:text-gray-300"
            >
              الرئيسية
            </Link>
          </li>
          {token && (
            <>
              <li>
                <Link
                  to="/favorite"
                  className="border-secondary text-secondary pb-1 text-xl font-bold transition duration-500 hover:text-gray-300"
                >
                  المفضلة
                </Link>
              </li>
              <li>
                <Link
                  to="/complaints"
                  className="border-secondary text-secondary pb-1 text-xl font-bold transition duration-500 hover:text-gray-300"
                >
                  الشكاوي
                </Link>
              </li>
              <li>
                <Link
                  to="/reserved-posts"
                  className="border-secondary text-secondary pb-1 text-xl font-bold transition duration-500 hover:text-gray-300"
                >
                  الحجوزات
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
      {token && (
        <input
          type="text"
          className="bg-primary w-[500px] rounded-3xl px-4 py-3 text-lg text-white transition-all outline-none"
          placeholder="ابحث عن اسم الشركة"
          onChange={(e) => setSearch(e.target.value)}
        />
      )}
      {token ? (
        <button
          onClick={logout}
          className="bg-secondary cursor-pointer rounded-lg px-5 py-3 text-white"
        >
          {isLoggingOut ? (
            <Oval
              visible={true}
              height="40"
              width="40"
              color="#fff"
              ariaLabel="oval-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          ) : (
            "تسجيل الخروج"
          )}
        </button>
      ) : (
        <div className="buttons flex items-center gap-6">
          <Link to="/signin" className="text-secondary text-xl">
            تسجيل الدخول
          </Link>
          <Link
            to="/register"
            className="bg-secondary cursor-pointer rounded-lg px-5 py-3 text-white"
          >
            انشاء حساب
          </Link>
        </div>
      )}
      {token && (
        <Link to="/profile">
          <img src="/images/user.png" alt="user" />
        </Link>
      )}
    </nav>
  );
};

export default NavBar;
