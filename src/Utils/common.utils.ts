export const EmptyFunction = () => {
	//empty function
};

export const resolveNavigation = (path: string) => {
	return `/admin/${path}`;
};
let timer: any;
export const Debounce = (func: (value?: any) => void, wait: number) => {
	return (...args: any) => {
		const context = this;
		clearTimeout(timer);
		timer = setTimeout(() => {
			func.apply(context, args);
		}, wait);
	};
};

export const GetObjectFromArray = (arr: any[], key: string, value: any) => {
	for (let element of arr) {
		if (element[key] === value) {
			return element;
		}
	}
	return {};
};
