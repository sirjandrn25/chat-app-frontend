import React, { useImperativeHandle, useState } from "react";
import SlidingPane from "./modal.component";

interface ModalWrapperInterface {
	component: (props: any) => React.ReactElement;
	headingTitle?: string;
	headingSubTitle?: string;
	props?: any;
	size?: number;
	openFrom?: "right" | "left" | "bottom";
}

// eslint-disable-next-line react/display-name
const ModalWrapper = React.forwardRef((props, ref) => {
	const [modals, setModals] = useState<any>([]);

	const close = (close_index: number = modals.length - 1) => {
		setTimeout(() => {
			const modal_list = [...modals];
			modal_list.splice(close_index, 1);
			setModals(modal_list);
		}, 400);

		const currentModal = modals[close_index];
		if (currentModal) currentModal.isVisible = false;

		setModals((prev: any) => {
			return (prev || []).map((modal: any, index: number) =>
				close_index === index ? currentModal : modal
			);
		});
	};
	const closeAll = () => {
		setModals((prev: any) => {
			return (prev || []).map((modal: any) => (modal.isVisible = false));
		});
		setTimeout(() => {
			setModals([]);
		}, 300);
	};
	const updateProps = (update_props: any) => {
		setModals((prev: any) => {
			const update_index = (prev || []).length - 1;
			return (prev || []).map((modal: any, index: number) => {
				if (index === update_index) {
					return {
						...modal,
						...update_props,
					};
				}
				return modal;
			});
		});
	};

	const open = ({
		component,
		props = {},
		...rest
	}: ModalWrapperInterface) => {
		const sheet = {
			props,
			component,
			isVisible: true,
			...rest,
		};

		setModals((prev: any = []) => {
			return [...prev, sheet];
		});
	};
	useImperativeHandle(
		ref,
		() => {
			return {
				close,
				open,
				closeAll,
				updateProps,
			};
		},
		[]
	);

	const EmptyComponent = () => {
		return <></>;
	};

	const renderModals = () => {
		return (modals || []).map((sheet: any, index: number) => {
			const Component = sheet?.component || EmptyComponent;
			const props = sheet.props;

			return (
				<SlidingPane closeModal={close} {...sheet} key={index}>
					<Component {...props} />
				</SlidingPane>
			);
		});
	};

	return renderModals();
});

export default ModalWrapper;
