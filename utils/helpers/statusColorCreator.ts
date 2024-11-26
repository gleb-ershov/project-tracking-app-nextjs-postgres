export const statusColorCreator = (status: string) => {
	return status === "completed"
		? "green"
		: status === "ongoing"
		? "red"
		: "gray";
};
