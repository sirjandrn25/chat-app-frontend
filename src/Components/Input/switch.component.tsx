import React, { useState } from "react";
type switchProps = {
	label?: string;
	onChange?: (value: any) => any;
	value?: boolean;
	className?: string;
};

const Switch = ({
	onChange,
	value = false,
	label = "",
	className = "",
}: switchProps) => {
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
				className="toggle toggle-primary toggle-sm"
				defaultChecked={checked}
				onChange={handleChecked}
			/>
		</div>
	);
};

export default Switch;
