import React, { useEffect, useState } from "react";
import Header from "./Components/header.component";
import SideBarComponent from "./Components/sidebar.component";
import useNavigation from "../../Hooks/useNavigation.hook";
import useAuthentication from "./Hooks/useAuthentication.hook";

export const DashboardWrapper = ({ children }: any) => {
	const [closed, setClosed] = useState<any>(false);
	const { handleLogout, isLogged, loading, userInfo, isPublicRoute } =
		useAuthentication();
	const { pathname, navigation } = useNavigation();
	//   useEffect(() => {
	//     isLogged && !loading && isRedirect()
	//   }, [pathname, isLogged, loading])

	if (loading) return <div>Loading ....</div>;
	// if (!isLogged) return navigation({ pathname: "/" });
	const isRedirect = () => {
		console.log({ isLogged, loading, path: !pathname.includes("admin") });
		if (isLogged && !loading && !pathname.includes("admin"))
			return navigation({ pathname: "admin" });
	};
	if (!isLogged && !loading && isPublicRoute(pathname))
		return <div>{children}</div>;
	// if (!isLogged) return <div>not authenticated</div>;

	return <div>{children}</div>;
};
export default DashboardWrapper;
