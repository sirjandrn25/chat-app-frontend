import { ReactNode } from "react";
import ReactModal from 'react-modal';
import "react-sliding-pane/dist/react-sliding-pane.css";
import { EmptyFunction } from "../../Utils/common.utils";

interface ModalInterface {
	isVisible?: boolean;
	headingTitle?: string;
	headingSubTitle?: string;
	size?: number;
	children: ReactNode;
	className?: string;
	closeModal?: (data?: any) => void;
	openFrom?: "right" | "left" | "bottom";
}

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
	},
};

const Modal = ({
	children,
	isVisible,
	headingSubTitle,
	headingTitle,
	size = 300,
	className = "",
	closeModal = EmptyFunction,
	openFrom = "right",
	...rest
}: ModalInterface) => {
	const width = `${size}px`;

	const handleClosePane = () => {
		closeModal();
	};

	return (
		<ReactModal
			onRequestClose={handleClosePane}
			// closeIcon={<div>Some div containing custom close icon.</div>}
			isOpen={isVisible as boolean}


			style={customStyles}
			contentLabel="Example Modal"

		// hideHeader={true}
		>
			{children}
		</ReactModal>
	);
};

export default Modal;
