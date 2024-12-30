import { Navigate, Outlet } from "react-router";
import { PublicRoutes } from "../models/routes";
function AuthGuard() {
  const jwt = localStorage.getItem("jwt");

  if (!jwt) {
    return <Navigate to={`/${PublicRoutes.LOGIN}`} replace />;
  }

  return <Outlet />;
}

export default AuthGuard;
