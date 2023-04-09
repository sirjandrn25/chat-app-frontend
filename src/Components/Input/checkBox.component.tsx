import React, { useState } from "react";
type checkBoxProps = {
	label?: string;
	onChange?: (value: any) => any;
	value?: boolean;
	className?: string;
};

const CheckBox = ({
	onChange,
	value = false,
	label = "",
	className = "",
}: checkBoxProps) => {
	const [checked, setChecked] = useState<boolean>(value);
	const handleChecked = (e: any) => {
		const isChecked = e.target.checked;
		setChecked(isChecked);
		if (onChange) {
			onChange(isChecked);
		}
	};
	return (
		<div className={`flex items-center gap-2 ${className}`}>
			{label && (
				<label htmlFor="checkbox" className="label-text">
					{label}
				</label>
			)}

			<input
				type="checkbox"
				defaultChecked={checked}
				onChange={handleChecked}
				className="checkbox checkbox-primary checkbox-sm"
			/>
		</div>
	);
};

export default CheckBox;
