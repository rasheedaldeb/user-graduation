import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import Favorite from "./Pages/Favorite";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import Register from "./Pages/Register";
import SignIn from "./Pages/SignIn";
import SingleEstate from "./Pages/SingleEstate";
import CompanyProfile from "./Pages/CompanyProfile";
import ProtectedRoute from "./Components/ProtectedRoute";
import Complaints from "./Pages/Complaints";
import ReservedPosts from "./Pages/ReservedPosts";
import { ContextProvider } from "./Context/Context";
function App() {
  return (
    <>
      <ContextProvider>
        <NavBar />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/" element={<Home />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/company-profile/:companyId"
              element={<CompanyProfile />}
            />
            <Route path="/favorite" element={<Favorite />} />
            <Route path="/single-estate/:postId" element={<SingleEstate />} />
            <Route path="/complaints" element={<Complaints />} />
            <Route path="/reserved-posts" element={<ReservedPosts />} />
          </Route>
        </Routes>
      </ContextProvider>
      <Footer />
    </>
  );
}

export default App;
