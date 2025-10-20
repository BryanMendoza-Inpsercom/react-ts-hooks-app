import { use, type Usable } from "react";
import { type User } from "./api/get-user.action";

// const userPromise = getUserAction(1);

interface Props {
  getUser: Usable<User>;
}

export const ClientInformation = ({ getUser }: Props) => {
  /*   useEffect(() => {
    getUserAction(id).then(console.log);
  }, [id]); */

  const user = use(getUser);

  return (
    <div className="bg-gradient flex flex-col gap-4">
      <h2 className="text-4xl font-thin text-white">
        {user.name} - #{user.id}
      </h2>
      <p className="text-white text-2xl">{user.location}</p>
      <p className="text-white text-2xl">{user.role}</p>
    </div>
  );
};
