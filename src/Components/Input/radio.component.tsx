import React, { useState } from "react";

type radioOptions = {
	label: string;
	value: any;
};

type radioProps = {
	radio_type: string;
	className?: string;
	options?: radioOptions[];
	onChange?: (value: any) => any;
	defaultValue?: any;
	radioClass?: string;
};

const Radio = ({
	radio_type,
	options = [],
	className = "",
	onChange,
	defaultValue = undefined,
	radioClass = "",
}: radioProps) => {
	const [checkedVal, setCheckedVal] = useState<any>(defaultValue);

	return (
		<div className={className}>
			{options.map((option, index) => {
				return (
					<div
						className={`flex gap-2 items-center ${radioClass}`}
						key={index}
					>
						{option.label && (
							<span className="label-text">{option.label}</span>
						)}
						<input
							type="radio"
							name={radio_type}
							className="radio radio-sm checked:bg-blue-500"
							defaultChecked={checkedVal === option.value}
							onChange={(e) => {
								if (e.target.checked) {
									setCheckedVal(option.value);
									if (onChange) onChange(option.value);
								}
							}}
						/>
					</div>
				);
			})}
		</div>
	);
};

export default Radio;
