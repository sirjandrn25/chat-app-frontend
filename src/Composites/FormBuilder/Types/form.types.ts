import { InputBaseType } from "../../../Components/Input/inputField.component";
import { SelectBoxType } from "../../../Components/SelectBox/selecBox.component";

export interface ValidationInterface {
	minLength?: number;
	maxLength?: number;
	isRequired?: number;
	pattern?: string;
}

export type SchemaBaseType = InputBaseType & {
	label: string;
	name: string;
	isRequired?: boolean;
	validation?: ValidationInterface;
	className?: string;
};

export type SchemaInputType = SchemaBaseType & {
	type: "text" | "number" | "password" | "email" | "checkbox" | "textarea";
};

export type SelectSchemaType = SchemaBaseType & {
	type: "select" | "radio";
} & SelectBoxType;

export type ObjectSchemaType = SchemaBaseType & {
	type: "object";
	formSchema: InputOrSelectType;
} & InputBaseType;
export type InputOrSelectType = SchemaInputType | SelectSchemaType;

export type SchemaType = InputOrSelectType | ObjectSchemaType;

type childrenType = {
	onSubmit: () => void;
	error: any;
	formData: any;
};
export interface FormInterface {
	fields: SchemaType[];
	onSubmit?: (data?: any) => void;
	data?: any;
	className?: string;
	layout?: "one" | "two" | "three";
	handleSubmit?: any;
	realTimeValidate?: boolean;
	children?: (data: childrenType) => void;
	submitLabel?: string | any;
}
