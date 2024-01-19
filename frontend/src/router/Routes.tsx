import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../App";
import Homepage from "../pages/Homepage/Homepage";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import NotFound from "../pages/NotFound";
import LoggedInAuth from "./loggedInAuth";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <LoggedInAuth />,
        children: [
          { path: "Login", element: <Login /> },
          { path: "Register", element: <Register /> },
        ],
      },
      { path: "", element: <Homepage /> },
      { path: "not-found", element: <NotFound /> },
      { path: "*", element: <Navigate replace to="/not-found" /> },
    ],
  },
]);
