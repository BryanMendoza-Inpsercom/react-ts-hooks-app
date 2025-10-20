import { useCallback, useState } from "react";
import { MySubTitle } from "./ui/MySubTitle";
import { MyTitle } from "./ui/MyTitle";

export const MemoHook = () => {
  const [title, setTitle] = useState("Hola");
  const [subTitle, setSubTitle] = useState("Mundo");

  const callMyAPICall = useCallback(() => {
    console.log("Llmar a mi API");
  }, []);

  return (
    <div className="bg-gradient flex flex-col gap-4">
      <h1 className="text-2xl font-thin text-white">MemoApp</h1>

      <MyTitle title={title} />
      <MySubTitle subtitle={subTitle} callMyAPI={callMyAPICall} />

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
        onClick={() => setTitle("Hello, " + new Date().getTime())}
      >
        Cambiar titulo
      </button>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
        onClick={() => setSubTitle("world," + new Date().getTime())}
      >
        Cambiar Subtitulo
      </button>
    </div>
  );
};
