import { UserContext } from "@/09-useContext/context/userContext";
import { Button } from "@/components/ui/button";
import { use, useContext } from "react";
// import { useNavigate } from "react-router";

export const ProfilePage = () => {

  const { user } = useContext(UserContext);
  const { logaut } = use(UserContext);
  // const navigation = useNavigate();

  const salir = () => {
    logaut();
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-4xl">Perfil del usuario</h1>
      <div className="mx-4">
        <pre className="my-4 w-[80%] overflow-x-auto">{JSON.stringify({ user }, null, 2)}</pre>
      </div>
      <Button onClick={salir} variant="destructive">Salir</Button>
    </div>
  );
};
