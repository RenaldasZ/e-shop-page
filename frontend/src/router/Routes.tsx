import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../App";
import Homepage from "../pages/Homepage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import LoggedInAuth from "./LoggedInAuth";
import ProductDetails from "../components/Catalog/ProductDetails";
import AboutUs from "../pages/AboutUs";

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
      {path: "about-us", element: <AboutUs />},
      { path: "catalog/:id", element: <ProductDetails /> },
      { path: "not-found", element: <NotFound /> },
      { path: "*", element: <Navigate replace to="/not-found" /> },
    ],
  },
]);
