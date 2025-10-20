import { Link } from "react-router";

export const AboutPages = () => {
  return (
    <div className="flex flex-col item-center justify-center min-h-screen">
      <h1 className="text-4xl">Página sobre mi</h1>
      <hr />
      <div className="flex flex-col gap-2">
        <Link to="/profile" className="hover:text-blue-500">
          Perfil
        </Link>
        <Link to="/login" className="hover:text-blue-500">
          Iniciar Sesión
        </Link>
      </div>
    </div>
  );
};
