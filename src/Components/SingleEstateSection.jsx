import { useNavigate, useParams } from "react-router-dom";
import SingleEstateSectionContent from "./SingleEstateSectionContent";
import SingleEstateSectionImages from "./SingleEstateSectionImages/SingleEstateSectionImages";
import { useEffect, useState } from "react";
import axios from "axios";

const SingleEstateSection = () => {
  const token = localStorage.getItem("token");
  const { postId } = useParams();
  const navigate = useNavigate();
  // fetch post details states
  const [postImages, setPostImages] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState("");
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
        setPostImages(res.data.data.PostImages);
        setIsFetching(false);
      } catch (e) {
        console.log(e);
        if (e.status === 401) {
          alert(e.response.data.message);
          localStorage.removeItem("companytoken");
          navigate("/company-signin");
        }
        if (e.message === "Network Error") {
          setError("لايوجد اتصال بالانترنت");
        }
      }
    };
    fetchPostDetails();
  }, []);
  return (
    <section className="flex min-h-screen items-center justify-between p-10">
      <SingleEstateSectionImages
        images={postImages}
        isLoading={isFetching}
        error={error}
      />
      <SingleEstateSectionContent />
    </section>
  );
};

export default SingleEstateSection;
