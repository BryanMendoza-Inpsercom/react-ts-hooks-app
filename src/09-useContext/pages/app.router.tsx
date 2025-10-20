import { createBrowserRouter, Navigate } from "react-router";
import { AboutPages } from "./about/AboutPages";
import { LoginPage } from "./auth/LoginPage";
import { ProfilePage } from "./profile/ProfilePage";

export const appRouter = createBrowserRouter([
  {
    //Cae al path vacio
    path: "/",
    element: <AboutPages />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    //pagina que no existe redirecciona a abou page
    path: "*",
    element: <Navigate to="/" />,
  },
]);
