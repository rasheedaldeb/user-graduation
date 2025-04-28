import Estates from "../Components/Estates";

import AboutCompany from "../Components/AboutCompany";
import Advertisements from "../Components/Advertisements";

const Home = () => {
  const token = localStorage.getItem("token");
  return (
    <div>
      {token && <Estates />}
      {!token && <Advertisements />}
      {!token && <AboutCompany />}
    </div>
  );
};

export default Home;
