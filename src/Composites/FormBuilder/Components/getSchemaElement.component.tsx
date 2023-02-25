import InputField from "../../../Components/Input/inputField.component";
import SelectBox from "../../../Components/SelectBox/selecBox.component";

const getSchemaElement = (type: string) => {
	const elements: any = {
		select: SelectBox,

		text: InputField,
	};

	if (["number", "password", "email", "textarea"].includes(type) || !type)
		return InputField;
	return elements[type];
};

export default getSchemaElement;
