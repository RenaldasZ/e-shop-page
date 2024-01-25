import { useContext, useEffect, useState } from "react";
import agent from "../api/agent";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingComponent from "../components/LoadingComponent/LoadingComponent";
import { LoginContext } from "../context/LoginContext";

export default function IsAuth() {
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const { setUserId } = useContext(LoginContext);

  const location = useLocation();

  useEffect(() => {
    agent.Users.getUserInfo()
      .then((response) => setResult(response.status))
      .catch((error) => {
        setResult(error.response.status);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const handleLogout = async () => {
      if (result === 401) {
        toast.error("Not Allowed");
        try {
          await agent.Users.logoutUser();
          localStorage.removeItem("username-eshop");
          localStorage.removeItem("userId-eshop");
          setUserId(null);
        } catch (error: any) {
          toast.error(error);
        }
        setRedirectToLogin(true);
      }
    };

    handleLogout();
  }, [result, setUserId]);

  if (loading) return <LoadingComponent message="Checking Identity" />;

  if (redirectToLogin) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <Outlet />;
}