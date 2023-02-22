import React, { useEffect, useState } from "react";
import { RemoveLocalState } from "../../../Utils/localState.utils";
import { calculateRemainingTime } from "../../../Utils/authentication.utils";
import useNavigation from "../../../Hooks/useNavigation.hook";
import { sendRequest } from "../../../Utils/service.utils";

const useAuthentication = () => {
	const [isLogged, setIsLogged] = useState(false);
	const [loading, setLoading] = useState(false);
	const { pathname, navigation, isReady, pressBack } = useNavigation();
	const [userInfo, setUserInfo] = useState<any>({});
	useEffect(() => {
		!loading && handleIsLogged();
	}, [pathname]);

	const handleIsLogged = async () => {
		setLoading(true);
		const { success, response } = await sendRequest({
			end_point: "auth/me",
			attachSessionId: true,
		});

		if (success) {
			console.log({ success, response });
			setUserInfo(response);
			const expire_time = calculateRemainingTime();
			console.log(expire_time);

			if (expire_time) {
				setTimeout(() => {
					handleLogout();
				}, expire_time);
				setIsLogged(true);
			} else {
				handleLogout();
			}
		} else {
			handleLogout();
		}
		setLoading(false);
	};
	const handleLogout = () => {
		RemoveLocalState();
		setIsLogged(false);
		navigation({ pathname: "auth/login" });
	};
	const isPublicRoute = (route: any) => {
		// if (!route) return true;
		return !route.includes("admin");
	};

	return {
		isLogged,
		loading,
		handleLogout,
		userInfo,
		isPublicRoute,
	};
};

export default useAuthentication;
