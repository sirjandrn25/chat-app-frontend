import { useState } from "react";
import { Debounce } from "../../Utils/common.utils";

export type InputBaseType = {
	label?: string;
	// size?: 'xs' | 'sm' | 'md' | 'lg'
	value?: any;
	onChange?: (value: any) => void;
	error?: boolean;
	errorMessage?: string;
	onBlur?: (value: any) => any;
	inputClassName?: string;
	placeholder?: string;
	isRequired?: boolean;
	disabled?: boolean;
	prefix?: any;
	suffix?: any;
	autoComplete?: boolean;
	autoFocus?: boolean;
	onDebounceChange?: (value: any) => void;
};
export type InputFieldType = InputBaseType & {
	type?: "text" | "number" | "email" | "textarea" | "password" | "file";
	icon?: any;
};

const InputField = ({
	onBlur,
	onChange,
	label = "",
	value = "",

	type = "text",
	icon = "",
	placeholder = "",

	error = false,
	errorMessage = "",
	inputClassName = "",
	isRequired = false,
	disabled = false,
	prefix,
	suffix,
	onDebounceChange,

	// size='sm',
	...rest
}: InputFieldType) => {
	const [inputValue, setInputValue] = useState<any>(value || "");

	const handleChange = (e: any) => {
		const input_val: any = e.target.value;
		setInputValue(input_val);
		if (onChange) {
			onChange(input_val);
		}
		if (onDebounceChange) {
			Debounce(onDebounceChange, 300)(input_val);
		}
	};
	const handleBlur = (e: any) => {
		const input_val: any = e.target.value;
		if (onBlur) {
			onBlur(input_val);
		}
	};
	const inputClass = `${
		error ? (type !== "textarea" ? "input-error" : "textarea-error") : ""
	} ${
		!error && "focus:border-info  focus:shadow-md rounded-[4px]"
	} focus:border-2 ${inputClassName}`;
	return (
		<div className="flex flex-col ">
			{label && (
				<label
					htmlFor="input_id"
					className={`label-text ${error && "text-error"} `}
				>
					<span>{label}</span>{" "}
					{isRequired && <span className="text-error">*</span>}
				</label>
			)}
			{type !== "textarea" && (
				<InputComponent
					handleChange={handleChange}
					inputValue={inputValue}
					placeholder={placeholder}
					handleBlur={handleBlur}
					inputClassName={inputClass}
					type={type}
					disabled={disabled}
					prefix={prefix}
					suffix={suffix}
					{...rest}
				/>
			)}
			{type === "textarea" && (
				<TextareaInput
					handleChange={handleChange}
					inputValue={inputValue}
					placeholder={placeholder}
					handleBlur={handleBlur}
					inputClassName={inputClass}
					disabled={disabled}
					{...rest}
				/>
			)}

			{error && errorMessage && (
				<div className="pl-1 mt-1 text-xs text-error">
					{errorMessage}
				</div>
			)}
		</div>
	);
};

const InputComponent = ({
	type,
	placeholder,
	inputValue,
	handleChange,
	inputClassName,
	disabled,
	handleBlur,
	prefix,
	suffix,
	...rest
}: any) => {
	return (
		<div className="relative flex items-center">
			<input
				value={inputValue}
				type={type}
				placeholder={placeholder}
				className={`input px-3  focus:outline-0 h-[38px] text-sm      w-full  ${inputClassName} ${
					prefix && "pl-8"
				} ${suffix && "pr-8"}`}
				onChange={handleChange}
				onBlur={handleBlur}
				disabled={disabled}
				{...rest}
			/>
			{prefix && <span className="absolute left-2">{prefix}</span>}
			{suffix && <span className="absolute right-2">{suffix}</span>}
		</div>
	);
};

export const TextareaInput = ({
	placeholder,
	inputValue,
	handleChange,
	inputClassName,
	disabled,
	handleBlur,
	...rest
}: any) => {
	return (
		<textarea
			value={inputValue}
			placeholder={placeholder}
			// className={`input px-3     input-bordered focus:border-2   w-full max-w-xs ${inputClassName}`}
			onChange={handleChange}
			onBlur={handleBlur}
			{...rest}
			disabled={disabled}
			className={`textarea px-3 textarea-bordered ${inputClassName} `}
		></textarea>
	);
};

export default InputField;
