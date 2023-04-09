import { AUTH_ROUTE } from "../../Constants/route.constant";
import useNavigation from "../../Hooks/useNavigation.hook";
import useAuth from "./Hooks/useAuth.hook";
import { useEffect } from "react";

export const DashboardWrapper = ({ children }: any) => {
  const { navigation } = useNavigation();

  const { isLogged, isPrivateRoute } = useAuth();
  useEffect(() => {
    if (!isLogged && isPrivateRoute) {
      return navigation({ pathname: AUTH_ROUTE });
    }
  }, [isLogged, isPrivateRoute, navigation]);

  if (!isLogged && !isPrivateRoute) {
    return <div>{children}</div>;
  }
  return <div>{children}</div>;
};
export default DashboardWrapper;
