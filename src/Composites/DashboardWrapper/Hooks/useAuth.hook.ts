import { useMemo } from "react";
import { useAuthUser, useIsAuthenticated, useSignOut } from "react-auth-kit";
import { AUTH_ROUTE } from "../../../Constants/route.constant";
import useNavigation from "../../../Hooks/useNavigation.hook";

const useAuth = () => {
  const isAuthenticated = useIsAuthenticated();
  const { pathname, navigation } = useNavigation();

  const auth = useAuthUser();
  const signOut = useSignOut();

  const handleLogout = () => {
    signOut();
    navigation({
      pathname: AUTH_ROUTE,
    });
  };

  const isPrivateRoute = useMemo(() => {
    if (pathname.includes("chat")) return true;
    return false;
  }, [pathname]);

  return {
    isLogged: isAuthenticated(),
    isPrivateRoute,
    loggedUser: auth(),
    handleLogout,
  };
};

export default useAuth;

// import { useMutation, useQuery } from "react-query";
// import { useEffectOnce } from "react-use";
// import useNavigation from "../../../Hooks/useNavigation.hook";

// const useAuth = () => {
//   const [loggedUser, setLoggedUser] = useState<any>();
//   const { navigation, pathname } = useNavigation();

//   const isPrivateRoute = useMemo(() => {
//     if (pathname.includes("chat")) return true;
//     return false;
//   }, [pathname]);

//   const enableConnection = useMemo(() => {
//     const { access_token, refresh_token } = AuthUser.getLoggedDetail() || {};
//     return access_token && refresh_token && isPrivateRoute;
//   }, [isPrivateRoute]);

//   useEffectOnce(() => {
//     const { access_token, refresh_token } = AuthUser.getLoggedDetail() || {};

//     if (!access_token && !refresh_token && isPrivateRoute) {
//       handleLogout();
//       return;
//     }
//   });
//   const { mutate: fetchRefreshToken } = useMutation(sendRefreshTokenRequest, {
//     onSuccess: (response: any) => {
//       setLoggedUser(response?.data?.user);
//       AuthUser.login(response.data);
//       handleLoginExpireSession();
//     },
//     onError: (error) => {
//       // console.log(error);
//       handleLogout();
//     },
//   });
//   const { isLoading, isSuccess, isError } = useQuery(
//     "user_profile",
//     fetchUserProfile,
//     {
//       onSuccess: (data) => {
//         setLoggedUser(data);
//         handleLoginExpireSession();
//       },
//       onError: (error) => {
//         fetchRefreshToken();
//       },
//       enabled: !!enableConnection,
//     }
//   );

//   const handleLoginExpireSession = () => {
//     //handle user loggin session
//     const expire_time = AuthUser.remainingLoginTimeOut();

//     if (expire_time > 0) {
//       setTimeout(fetchRefreshToken, expire_time);
//     } else {
//       fetchRefreshToken();
//     }
//   };

//   const handleLogout = () => {
//     setLoggedUser(false);

//     AuthUser.logout();
//     navigation({
//       pathname: AUTH_ROUTE,
//     });
//   };

//   return {
//     loggedUser,
//     isLoading,
//     isPrivateRoute,
//     handleLogout,
//     isSuccess,
//     isError,
//   };
// };

// export default useAuth;
