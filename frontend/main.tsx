import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./src/router/Routes.tsx";
import { LoginProvider } from "./src/context/LoginContext.tsx";
import { CatalogProvider } from "./src/context/CatalogContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LoginProvider>
      <CatalogProvider>
        <RouterProvider router={router} />
      </CatalogProvider>
    </LoginProvider>
  </React.StrictMode>
);
