import { FormInterface } from "../../Composites/FormBuilder/Types/form.types";
import FormBuilder from "../../Composites/FormBuilder/formBuilder";

const Register = () => {
	const formSchema: FormInterface = {
		fields: [
			{
				name: "profile.first_name",
				label: "First Name",
				type: "text",
				isRequired: true,
			},
			{
				name: "profile.last_name",
				label: "Last Name",
				type: "text",
				isRequired: true,
			},
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
			{
				name: "re_password",
				label: "Confirm Password",
				type: "password",
				isRequired: true,
			},
		],
	};
	return (
		<div className="flex items-center justify-center h-screen w-screen">
			<div className="h-auto w-[400px] flex flex-col rounded gap-2 py-4 shadow-lg">
				<div className="text-center p-4 font-bold text-info  text-xl py-2 border-b">
					Register New User
				</div>
				<FormBuilder {...formSchema} />
				<div className="border-t flex items-center justify-between p-4 gap-2">
					<div className="text-info ">Go to Login</div>
				</div>
			</div>
		</div>
	);
};

export default Register;
