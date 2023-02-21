import React from "react";
// import Ripples from "react-ripples";
// import { colors } from 'react-select/dist/declarations/src/theme'

type iconProps = {
	source: string | (() => any) | any;
	size?: number;
	onClick?: () => void;
	rounded?: boolean;
	badge?: any;
	isSvg?: boolean;
	iconColor?: string;
	className?: string;
	ripple?: boolean;
	cursor?: boolean;
	isReactIcon?: boolean;
};

const Icon = ({
	source,
	isSvg = false,
	iconColor = "text-black",
	size = 20,
	onClick = () => {},
	rounded = false,
	className = "",
	ripple = false,
	cursor = true,
	isReactIcon = false,
}: iconProps) => {
	const iconStyle = {
		height: `${size}px`,
		width: `${size}px`,
	};
	const iconClass = `${
		rounded ? "rounded-full" : "rounded"
	} ${iconColor} ${className} ${cursor ? "cursor-pointer" : ""}`;
	if (isReactIcon) {
		const IconComp = source;
		return (
			<IconComp
				onClick={onClick}
				size={size}
				color={iconColor}
				className={`${iconClass} cursor-pointer`}
			/>
		);
	}

	return (
		<IconDisplay
			source={source}
			iconClass={iconClass}
			iconStyle={iconStyle}
			isSvg={isSvg}
			onClick={onClick}
			isReactIcon={isReactIcon}
			size={size}
			iconColor={iconColor}
		/>
	);
};

const IconDisplay = ({
	source,
	iconStyle,
	iconClass,
	isSvg,
	onClick,
	isReactIcon,
}: any) => {
	if (isSvg || isReactIcon) {
		const SVGComp = source;

		return (
			<div className={iconClass} style={iconStyle} onClick={onClick}>
				{isSvg && <SVGComp />}
				{/* {isReactIcon && <IconComp size={size} color={iconColor} />} */}
			</div>
		);
	}

	return (
		<>
			<img
				style={iconStyle}
				className={`${iconClass} object-cover`}
				src={source()}
				alt="icon"
				onClick={onClick}
			/>
		</>
	);
};

export default Icon;
