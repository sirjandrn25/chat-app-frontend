import { lazy } from "react";
import useNavigation from "../../Hooks/useNavigation.hook";

const Login = lazy(() => import("./Components/login.component"));
const Register = lazy(() => import("./Components/register.component"));

const Auth = () => {
  const { query } = useNavigation();
  const { tabs = "login" } = query || {};
  const tab_items: any = {
    login: <Login />,
    register: <Register />,
  };

  return tab_items[tabs as any];
};

export default Auth;
