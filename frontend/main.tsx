import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./src/router/Routes.tsx";
import { LoginProvider } from "./src/context/LoginContext.tsx";
import { CatalogProvider } from "./src/context/CatalogContext.tsx";
import { BasketProvider } from "./src/context/BasketContext.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId="473516761896-hud7n7jsv9qtop5m6shj97rvt1b36cvv.apps.googleusercontent.com">
    <React.StrictMode>
      <LoginProvider>
        <CatalogProvider>
          <BasketProvider>
            <RouterProvider router={router} />
          </BasketProvider>
        </CatalogProvider>
      </LoginProvider>
    </React.StrictMode>
  </GoogleOAuthProvider>
);
