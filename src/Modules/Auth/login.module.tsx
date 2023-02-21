import { FormInterface } from "../../Composites/DashboardWrapper/FormBuilder/Types/form.types";
import FormBuilder from "../../Composites/DashboardWrapper/FormBuilder/formBuilder";

const Login = () => {
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
