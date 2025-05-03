import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");
  return token ? <Outlet /> : <Navigate to="/signin" replace={true} />;
};

export default ProtectedRoute;
