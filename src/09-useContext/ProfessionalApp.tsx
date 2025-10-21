import { RouterProvider } from "react-router";
import { appRouter } from "./pages/app.router";
import { UserContextProvider } from "./context/userContext";

export const ProfessionalApp = () => {
  return (
    <UserContextProvider>
      <div className="bg-gradient flex flex-col">
        <RouterProvider router={appRouter} />
      </div>
    </UserContextProvider>
  );
};
