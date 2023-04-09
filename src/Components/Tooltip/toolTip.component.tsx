import React, { useMemo } from "react";

type toolTipPosition = "top" | "bottom" | "left" | "right";

interface TooltipInterface {
	title: string;
	position?: toolTipPosition;
	children: React.ReactNode;
}

const ToolTip = ({ title, position = "top", children }: TooltipInterface) => {
	const getPosition = (position: toolTipPosition) => {
		switch (position) {
			case "top":
				return "tooltip-top";
			case "bottom":
				return "tooltip-bottom";
			case "left":
				return "tooltip-left";
			case "right":
				return "tooltip-right";
			default:
				return "tooltip-bottom";
		}
	};

	const combineClassName = (mainClass: string, extraStyle: string) => {
		return mainClass + " " + extraStyle;
	};
	const toolTipClassName = useMemo(() => {
		let mainClassName = "";
		mainClassName = combineClassName(mainClassName, getPosition(position));
		return mainClassName;
	}, [position]);

	return (
		<div className={`tooltip ${toolTipClassName}`} data-tip={title}>
			{children}
		</div>
	);
};

export default ToolTip;
