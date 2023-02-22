import { useMutation } from "react-query";
import { FormInterface } from "../../Composites/FormBuilder/Types/form.types";
import FormBuilder from "../../Composites/FormBuilder/formBuilder";
import axios from "axios";
import { BASE_URL } from "../../Constants/api.constant";
import { AuthUser } from "../../Utils/authentication.utils";
import useNavigation from "../../Hooks/useNavigation.hook";
import { CHAT_ROUTE } from "../../Constants/route.constant";
import { useEffectOnce } from "react-use";

const Login = () => {
	const { isError, isSuccess, isLoading, mutate, data, error } = useMutation(
		(loginData) => {
			return axios.post(`${BASE_URL}/api/auth/login`, loginData);
		}
	);
	const { navigation } = useNavigation();
	useEffectOnce(() => {
		if (AuthUser.isLoggin()) {
			return navigation({
				pathname: CHAT_ROUTE,
			});
		}
	});

	if (!isLoading && isSuccess) {
		AuthUser.login(data);
		navigation({
			pathname: CHAT_ROUTE,
		});
	}

	const formSchema: FormInterface = {
		fields: [
			{
				name: "email",
				label: "Email",
				type: "email",
				isRequired: true,
			},
			{
				name: "password",
				label: "Password",
				type: "password",
				isRequired: true,
			},
		],
		handleSubmit: (values: any) => mutate(values),
	};
	return (
		<div className="flex items-center justify-center h-screen w-screen">
			<div className="h-auto w-[400px] flex flex-col rounded gap-2 py-4 shadow-lg">
				<div className="text-center p-4 font-bold text-info  text-xl py-2 border-b">
					Login Here
				</div>
				<FormBuilder {...formSchema} />
				<div className="border-t flex items-center justify-between p-4 gap-2">
					<div className="text-info ">Create An Account</div>
					<div className="text-info ">Forgot Password</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
