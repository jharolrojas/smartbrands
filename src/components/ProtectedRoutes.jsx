import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const token = JSON.parse(localStorage.getItem("token"));

  if (token) {
    return <Outlet />;
  } else {
    return <Navigate to="/" />;
  }
};

export default ProtectedRoutes;
