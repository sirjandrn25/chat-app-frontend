import { useState } from "react";
import useNavigation from "../../Hooks/useNavigation.hook";
import useAuth from "./Hooks/useAuth.hook";

export const DashboardWrapper = ({ children }: any) => {
	const { isLoading, loggedUser, isSuccess, isPrivateRoute } = useAuth();

	//   useEffect(() => {
	//     isLogged && !loading && isRedirect()
	//   }, [pathname, isLogged, loading])

	if (isLoading && isPrivateRoute) return <div>Loading ....</div>;

	return <div>{children}</div>;
};
export default DashboardWrapper;
