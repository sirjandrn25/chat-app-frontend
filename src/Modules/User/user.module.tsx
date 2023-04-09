import { useQuery } from "react-query";
import { asyncService } from "../../Utils/service.utils";

const UserModule = () => {
  const { data: user } = useQuery(
    "user_profile",
    () =>
      asyncService({
        end_point: "users/profile/me",
      }),
    {
      retry: 2,
    }
  );
  const getFullName = () => {
    const { profile } = (user as any) || {};
    return profile?.first_name + " " + profile?.last_name;
  };
  return (
    <div className="shadow-xl card card-side bg-base-100">
      <figure>
        <img src="https://demo.sirv.com/bag.jpg?scale.width=311" alt="Movie" />
      </figure>
      <div className="card-body">
        <h2 className="capitalize card-title">{getFullName()}</h2>
        <p>{(user as any)?.email}</p>
      </div>
    </div>
  );
};

export default UserModule;
