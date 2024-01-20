import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";
import { toast } from "react-toastify";

export default function LoggedInAuth() {
  const { userId } = useContext(LoginContext);
  const location = useLocation();

  if (userId != null) {
    return <><Navigate to="/" state={{ from: location }} />
    {toast.error("You are not allowed")}
    </>
  }

  return <Outlet />;
}
