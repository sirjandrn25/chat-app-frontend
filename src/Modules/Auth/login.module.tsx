import axios from "axios";
import { useMutation } from "react-query";
import { useEffectOnce } from "react-use";
import { FormInterface } from "../../Composites/FormBuilder/Types/form.types";
import FormBuilder from "../../Composites/FormBuilder/formBuilder";
import { BASE_URL } from "../../Constants/api.constant";
import { CHAT_ROUTE, REGISTER_ROUTE } from "../../Constants/route.constant";
import useNavigation from "../../Hooks/useNavigation.hook";
import { AuthUser } from "../../Utils/authentication.utils";
import Button from "../../Components/Button/button.component";

const Login = () => {
	const { isError, isSuccess, isLoading, mutate, data, error } = useMutation(
		(loginData) => {
			return axios.post(`${BASE_URL}/auth/login`, loginData);
		},
		{
			onSuccess: (response) => {
				AuthUser.login(response.data);
				navigation({
					pathname: CHAT_ROUTE,
				});
			},
			onError: (error) => {
				console.log(error);
			},
		}
	);
	const { navigation } = useNavigation();
	useEffectOnce(() => {
		if (AuthUser.remainingLoginTimeOut() > 0) {
			return navigation({
				pathname: CHAT_ROUTE,
			});
		}
	});

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
		submitLabel: "Login",
	};
	return (
		<div className="flex items-center justify-center w-screen h-screen">
			<div className="h-auto w-[400px] flex flex-col rounded gap-2 py-4 shadow-lg">
				<div className="p-4 py-2 text-xl font-bold text-center border-b text-info">
					Login Here
				</div>
				<FormBuilder {...formSchema} />
				<div className="flex items-center justify-between gap-2 p-4 border-t">
					<Button
						onClick={() => navigation({ pathname: REGISTER_ROUTE })}
						className="btn btn-link"
					>
						Create An Account
					</Button>
					<div className="text-info ">Forgot Password</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
