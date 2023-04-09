const base_local_state = "local_state";

const getBaseLocalState = () => {
	const state_value = localStorage.getItem(base_local_state) || `{}`;
	return JSON.parse(state_value);
};

export const setLocalState = (key: string, value: any) => {
	const base_state: any = getBaseLocalState() || {};
	const state_base_value = JSON.stringify({
		...base_state,
		[key]: value,
	});

	localStorage.setItem(base_local_state, state_base_value);
};

export const getLocalState = (key: string) => {
	const base_state: any = getBaseLocalState() || {};

	return base_state[key];
};

export const removeLocalStateItem = (key: string) => {
	const base_state: any = getBaseLocalState() || {};
	delete base_state[key];
	localStorage.setItem(base_local_state, base_state);
};

export const clearLocalState = () => {
	localStorage.setItem(base_local_state, "");
};
