import { LOGIN_ROUTE } from "./../../../Constants/route.constant";
import axios from "axios";
import { useCallback, useState } from "react";
import { calculateRemainingTime } from "../../../Utils/authentication.utils";
import { BASE_URL } from "./../../../Constants/api.constant";
import { AuthUser } from "./../../../Utils/authentication.utils";

import { useMutation, useQuery } from "react-query";
import { useUpdateEffect } from "react-use";
import useNavigation from "../../../Hooks/useNavigation.hook";

const fetchUser = async () => {
	const loggedDetail = AuthUser.getLoggedDetail();
	const { access_token } = loggedDetail;
	const config = { Authorization: `Bearer ${access_token}` };
	return await axios({
		url: `${BASE_URL}/users/profile/me`,
		headers: {
			...config,
		},
	});
};

const postRefreshToken = async () => {
	const loggedDetail = AuthUser.getLoggedDetail();
	const { refresh_token } = loggedDetail;
	return await axios({
		url: `${BASE_URL}/auth/refresh_token`,
		data: {
			token: refresh_token,
		},
	});
};

const useAuthentication = () => {
	const [isLogged, setIsLogged] = useState(false);
	// const [loading, setLoading] = useState(false);
	const { pathname, navigation, isReady, pressBack } = useNavigation();

	const {
		isLoading,
		isError,
		isSuccess,
		data: userInfo,
		refetch,
	} = useQuery("user_profile", fetchUser);
	const {
		isLoading: refreshLoading,
		isError: refreshError,
		isSuccess: refreshSuccess,
		data,
		mutate,
	} = useMutation(postRefreshToken);
	const handleRefreshToken = useCallback(() => {
		mutate();
	}, [mutate]);
	const handleAccesToken = useCallback(() => {
		if (isSuccess) {
			const expire_time = calculateRemainingTime();
			if (expire_time) {
				setIsLogged(true);
				setTimeout(() => handleRefreshToken, expire_time);
			} else {
				handleRefreshToken();
			}
		}
	}, [handleRefreshToken, isSuccess]);
	useUpdateEffect(() => {
		if (refreshLoading) return;
		if (refreshError) {
			navigation({
				pathname: LOGIN_ROUTE,
			});
			return;
		}
		AuthUser.login(data);
	}, [refreshLoading, refreshSuccess, refreshError]);

	useUpdateEffect(() => {
		if (isLoading) return;
		!isLoading && handleAccesToken();
	}, [isLoading, refreshLoading, refreshSuccess]);

	// const handleIsLogged = async () => {
	// 	setLoading(true);
	// 	const { success, response } = await sendRequest({
	// 		end_point: "auth/me",
	// 		attachSessionId: true,
	// 	});

	// 	if (success) {
	// 		console.log({ success, response });
	// 		setUserInfo(response);
	// 		const expire_time = calculateRemainingTime();

	// 		if (expire_time) {
	// 			setTimeout(() => {
	// 				handleLogout();
	// 			}, expire_time);
	// 			setIsLogged(true);
	// 		} else {
	// 			handleLogout();
	// 		}
	// 	} else {
	// 		handleLogout();
	// 	}
	// 	setLoading(false);
	// };
	// const handleLogout = () => {
	// 	RemoveLocalState();
	// 	setIsLogged(false);
	// 	navigation({ pathname: "auth/login" });
	// };
	// const isPublicRoute = (route: any) => {
	// 	// if (!route) return true;
	// 	return !route.includes("admin");
	// };

	return {
		isLoading,
		isSuccess,
		userInfo,
		isError,
	};
};

export default useAuthentication;
