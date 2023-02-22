import { createContext, useContext, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { LOGIN_ROUTE } from "../Constants/route.constant";
import useNavigation from "../Hooks/useNavigation.hook";
import {
	AuthUser,
	fetchUserProfile,
	sendRefreshTokenRequest,
} from "../Utils/authentication.utils";
import { EmptyFunction } from "../Utils/common.utils";

interface AuthContextInterface {
	loggedUser: any;
	isLoading: boolean;
	handleLogout: () => void;
}

const AuthContext = createContext<AuthContextInterface>({
	loggedUser: {},
	isLoading: false,
	handleLogout: EmptyFunction,
});

export const AuthContextProvider = ({ children }: any) => {
	const [loggedUser, setLoggedUser] = useState<any>();
	const { navigation } = useNavigation();
	const { mutate: fetchRefreshToken } = useMutation(sendRefreshTokenRequest, {
		onSuccess: (data: any) => {
			setLoggedUser(data?.user);
			AuthUser.login(data);
			handleLoginExpireSession();
		},
		onError: () => {
			handleLogout();
		},
	});
	const { isLoading } = useQuery("user_profile", fetchUserProfile, {
		onSuccess: (data) => {
			setLoggedUser(data);
			handleLoginExpireSession();
		},
		onError: () => fetchRefreshToken(),
	});

	const handleLoginExpireSession = () => {
		//handle user loggin session
		const { expire_time, refresh_token } = AuthUser.getLoggedDetail() || {};
		if (expire_time) {
			setTimeout(fetchRefreshToken, expire_time);
		} else {
			fetchRefreshToken();
		}
	};

	const handleLogout = () => {
		setLoggedUser(false);
		AuthUser.logout();
		navigation({
			pathname: LOGIN_ROUTE,
		});
	};

	return (
		<AuthContext.Provider value={{ loggedUser, isLoading, handleLogout }}>
			{children}
		</AuthContext.Provider>
	);
};

const useAuth = () => {
	const { loggedUser, isLoading, handleLogout } = useContext(AuthContext);
	return { loggedUser, isLoading, handleLogout };
};
export default useAuth;
