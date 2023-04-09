import cogoToast from "cogo-toast";

type toastTypes = {
	message: string;
	position?: "top-right" | "top-left" | "bottom-left" | "bottom-right";
};

class Toast {
	static success({ message, position }: toastTypes) {
		cogoToast.success(message, {
			position: position ? position : "top-right",
		});
	}
	static error({ message, position }: toastTypes) {
		cogoToast.error(message, {
			position: position ? position : "top-right",
		});
	}

	static warn({ message, position }: toastTypes) {
		cogoToast.warn(message, {
			position: position ? position : "top-right",
		});
	}
	static loading({ message, position }: toastTypes) {
		cogoToast.loading(message, {
			position: position ? position : "top-right",
		});
	}
}

export const serverErrorToast = (error: any[]) => {
	for (const [key, value] of Object.entries(error)) {
		Toast.error({ message: `${key}:  ${value}` });
	}
};

export default Toast;
