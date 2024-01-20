import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./src/router/Routes.tsx";
import { LoginProvider } from "./src/context/LoginContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LoginProvider>
      <RouterProvider router={router} />
    </LoginProvider>
  </React.StrictMode>
);
