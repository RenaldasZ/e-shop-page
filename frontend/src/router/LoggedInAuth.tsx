import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";
import { toast } from "react-toastify";

export default function LoggedInAuth() {
  const { userId } = useContext(LoginContext);
  const location = useLocation();

  // Redirect already logged-in users away from login/register pages.
  if (userId != null && (location.pathname === "/login" || location.pathname === "/register")) {
    toast.error("You are already logged in");
    return <Navigate to="/" />;
  }

  // Allow access to other routes.
  return <Outlet />;
}
