import React, { useEffect, useState, useMemo } from "react";
import { EmptyFunction } from "../../Utils/common.utils";
import Joi from "joi";

type phoneNumberProps = {
	label?: string;
	defaultValue?: string;
	onChange?: (value: any) => void;
	placeholder?: string;
	inputClassName?: string;
	isRequired?: boolean;
	errorMessage?: string;
	prefix?: any;
};

const PhoneNumberInput = ({
	label = "",
	defaultValue = "",
	onChange = EmptyFunction,
	placeholder = "",
	inputClassName = "",
	isRequired = false,
	errorMessage = "",
	prefix,
}: phoneNumberProps) => {
	const [error, setError] = useState(errorMessage);
	const [inputValue, setInputValue] = useState<any>(defaultValue);
	const [isAllow, setIsAllow] = useState<boolean>(false);
	useEffect(() => {
		isAllow && validation();
		errorMessage && validation(errorMessage);
	}, [inputValue, errorMessage]);
	const schema = useMemo(
		() =>
			Joi.string()
				.length(10)
				.pattern(/^[0-9]+$/)
				.required(),
		[]
	);
	const validation = (errorMsg: string = "") => {
		const { error } = schema.validate(inputValue);
		if (error) {
			setError(errorMessage || "Phone Number must be 10 digits");
		} else {
			setError("");
		}
	};
	const handleChange = (e: any) => {
		const value = e.target.value;
		if (value.length > 10) return;
		setInputValue(value);
		onChange(value);
	};

	const inputClass = `${error ? "input-error" : ""} ${
		!error && "focus:border-info  focus:shadow-md "
	} focus:border-2 rounded-[4px] `;
	return (
		<div className={`flex flex-col ${inputClassName}`}>
			{label && (
				<label
					htmlFor="input_id"
					className={`label-text ${
						error && "text-error"
					} flex  items-center  `}
				>
					<span>{label}</span>{" "}
					{isRequired && <span className="text-error">*</span>}
				</label>
			)}
			<div className="relative flex items-center">
				<input
					value={inputValue}
					type={"number"}
					placeholder={placeholder}
					className={`input px-3  focus:outline-none h-[38px] text-sm   input-bordered   w-full max-w-xs ${inputClass} ${
						prefix && "pl-8"
					}  `}
					onChange={handleChange}
					// onBlur={handleBlur}
					onFocus={(e) => setIsAllow(true)}
				/>
				{prefix && <span className="absolute left-2">{prefix}</span>}
			</div>

			{error && <div className="text-error text-xs pl-1">{error}</div>}
		</div>
	);
};

export default PhoneNumberInput;
