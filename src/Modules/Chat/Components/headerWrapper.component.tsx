import React, { ReactElement, ReactNode } from "react";

const HeaderWrapper = ({
	className = "",
	children,
}: {
	className?: string;
	children?: any;
}) => {
	return (
		<div
			className={`w-full h-[60px] p-4 flex flex-row border-b ${className}`}
		>
			{children}
		</div>
	);
};

export default HeaderWrapper;
