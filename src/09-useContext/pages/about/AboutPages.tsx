import { UserContext } from "@/09-useContext/context/userContext";
import { Button } from "@/components/ui/button";
import { use } from "react";
import { Link } from "react-router";

export const AboutPages = () => {

  const { logaut, isAuthenticate } = use(UserContext);

  return (
    <div className="flex flex-col item-center justify-center min-h-screen">
      <h1 className="text-4xl">Página sobre mi</h1>
      <hr />
      <div className="flex flex-col gap-2">

        {
          isAuthenticate && (<Link to="/profile" className="hover:text-blue-500">
            Perfil
          </Link>)
        }

        {
          isAuthenticate ? (
            <Button onClick={logaut} variant='destructive'>
              Cerrar Sesión
            </Button>
          ) : (
            <Link to="/login" className="hover:text-blue-500">
              Iniciar Sesión
            </Link>)
        }

      </div>
    </div>
  );
};
