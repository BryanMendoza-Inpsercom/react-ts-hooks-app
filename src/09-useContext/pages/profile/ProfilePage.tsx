import { Button } from "@/components/ui/button";

export const ProfilePage = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-4xl">Perfil del usuario</h1>
      <pre className="my-4">{JSON.stringify({}, null, 2)}</pre>
      <Button variant="destructive">Salir</Button>
    </div>
  );
};
