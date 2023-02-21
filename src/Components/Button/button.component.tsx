import React, { useMemo, useState } from "react";
import { EmptyFunction } from "../../Utils/common.utils";

type colorType =
	| "primary"
	| "secondary"
	| "accent"
	| "info"
	| "success"
	| "warning"
	| "error"
	| "ghost";

type buttonProps = {
	onClick?: (value: any) => void;
	size?: "xs" | "sm" | "md" | "lg";
	color?: colorType;
	fullWidth?: boolean;
	ripple?: boolean;
	className?: string;
	progress?: boolean;
	outline?: boolean;
	disabled?: boolean;
	shape?: "square" | "circle";
	children: any;
};

const Button = ({
	onClick = EmptyFunction,
	size = "md",
	color,
	fullWidth = false,
	className = "",
	progress = false,
	outline = false,
	disabled = false,
	shape = "square",
	children,
}: buttonProps) => {
	const [loading, setLoading] = useState<any>(false);

	const next = () => setLoading(false);

	const handleClick = () => {
		if (loading) return;

		progress && setLoading(true);
		onClick(next);
	};
	const buttonColor = (() => {
		switch (color) {
			case "primary":
				return "btn-primary";
			case "secondary":
				return "btn-secondary";
			case "info":
				return "btn-info";
			case "accent":
				return "btn-accent";
			case "success":
				return "btn-success";
			case "error":
				return "btn-error";
			case "warning":
				return "btn-warning";
			case "ghost":
				return "btn-ghost";
			default:
				return "";
		}
	})();
	const buttonSize = useMemo(() => {
		switch (size) {
			case "sm":
				return "btn-sm";
			case "xs":
				return "btn-xs";
			case "lg":
				return "btn-lg";
			default:
				return "btn-md";
		}
	}, [size]);
	const buttonClass = `${
		fullWidth && "w-full"
	} ${buttonColor} ${buttonSize} ${outline && "btn-outline"} ${
		loading && "loading"
	}`;
	const buttonShape = useMemo(() => {
		if (shape === "circle") return "btn-circle";
		return "";
	}, [shape]);

	return (
		<button
			disabled={disabled}
			className={`btn  ${buttonShape} ${className} } ${buttonClass} `}
			onClick={handleClick}
		>
			{children}
		</button>
	);
};

export default Button;
