export const JoiErrorMessageToJson = (error: any) => {
	if (!error) return {};
	const { context, message } = error.details[0];

	const { key, label } = context;
	const covert_key = key.split("_").reduce((prev: any, next: any) => {
		return (
			prev.charAt(0).toUpperCase() + " " + next.charAt(0).toUpperCase()
		);
	}, "");

	message.replace(`"\"`, "");
	message.replace(key, covert_key);
	return { [key]: message };
};
