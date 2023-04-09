import React, { ReactNode, useState } from "react";
import ReactSlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { EmptyFunction } from "../../Utils/common.utils";

interface SlidingPaneInterface {
	isVisible?: boolean;
	headingTitle?: string;
	headingSubTitle?: string;
	size?: number;
	children: ReactNode;
	className?: string;
	closeModal?: (data?: any) => void;
	openFrom?: "right" | "left" | "bottom";
}

const SlidingPane = ({
	children,
	isVisible,
	headingSubTitle,
	headingTitle,
	size = 300,
	className = "",
	closeModal = EmptyFunction,
	openFrom = "right",
	...rest
}: SlidingPaneInterface) => {
	const width = `${size}px`;

	const handleClosePane = () => {
		closeModal();
	};

	return (
		<ReactSlidingPane
			onRequestClose={handleClosePane}
			// closeIcon={<div>Some div containing custom close icon.</div>}
			from={openFrom}
			isOpen={isVisible}
			width={width}
			title={headingTitle}
			subtitle={headingSubTitle}
			className={`p-0 ${className}`}

			// hideHeader={true}
		>
			{children}
		</ReactSlidingPane>
	);
};

export default SlidingPane;
