import React, { useState } from "react";
import Select from "react-select";
import { EmptyFunction } from "../../Utils/common.utils";
export type SelectOptionType = {
	label: string;
	value: string | number;
	data?: any;
};

export type SelectBoxType = {
	label?: string;
	options: SelectOptionType[];
	onChange?: (value: any) => any;
	error?: boolean;
	isMultiple?: boolean;
	defaultInputValue?: any;
	defaultTheme?: any;
	isRequired?: boolean;
	errorMessage?: string;
	className?: string;
};

const SelectBox = ({
	label,
	options,
	onChange = EmptyFunction,
	error = false,
	errorMessage = "",
	isMultiple = false,
	defaultInputValue = "",
	isRequired = false,
	defaultTheme = {},
	className = "",
}: SelectBoxType) => {
	const [value, setValue] = useState<any>(defaultInputValue);
	const error_color = "#dc143c";

	const customStyles = {
		// option: (provided: any, state: any) => ({
		// 	...provided,
		// 	borderBottom: "1px dotted pink",
		// 	color: state.isSelected ? "red" : "blue",
		// 	padding: 20,
		// }),
		container: (base: any) => ({
			...base,
			// width: width,
			outline: 0,
		}),
		control: (base: any) => ({
			...base,
			width: "100%",
			// minHeight: getHeight(),
			// height: getHeight(),
			borderColor: error && error_color,
			":hover": {
				borderColor: error ? error_color : `rgb(102,174,232)`,
				boxShadow: `0 2px 4px 1px  rgba(102,174,232,0.2)`,
				outline: 0,
			},
			":focus-within": {
				borderColor: error ? error_color : `rgb(102,174,232)`,
				borderWidth: "2px",
			},
		}),
		singleValue: (provided: any, state: any) => {
			const opacity = state.isDisabled ? 0.5 : 1;
			const transition = "opacity 300ms";

			return { ...provided, opacity, transition };
		},
	};

	return (
		<div className={`flex flex-col select-box gap-1 text-sm ${className}`}>
			<div
				className={`${error ? "text-error" : ""} label-text font-sans`}
			>
				{" "}
				<span>{label}</span>{" "}
				{isRequired && <span className="text-error">*</span>}
			</div>
			<Select
				options={options}
				isMulti={isMultiple}
				onChange={(data) => onChange(data)}
				defaultInputValue={value && value.label}
				styles={customStyles}
			/>
			{error && errorMessage && (
				<div className="text-error text-xs pl-1">{errorMessage}</div>
			)}
		</div>
	);
};

export const parseSelectBoxValue = (
	data: any,
	label: any = "",
	value: any = ""
) => {
	return data.map((item: any, index: any) => {
		if (typeof item === "string") {
			return {
				label: item,
				id: index + 1,
				value: item,
			};
		}
		return {
			label: item[label],
			value: item[value],
			data: item,
		};
	});
};
export default SelectBox;
