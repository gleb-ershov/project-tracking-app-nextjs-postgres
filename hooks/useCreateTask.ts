import { useReducer } from "react";

interface ICreateTaskHookState {
	tagInputValue: string[];
	datePickerValue: Date;
	linksInputs: { value: string }[];
}
interface ICreateTaskHookAction {
	type: string;
	payload?: string[] | Date | { value: string }[];
}

const initialStateCreator = (): ICreateTaskHookState => {
	return {
		tagInputValue: [],
		datePickerValue: new Date(Date.now()),
		linksInputs: [{ value: "" }],
	};
};

export const useCreateTask = () => {
	function reducer(
		state: ICreateTaskHookState,
		action: ICreateTaskHookAction
	): ICreateTaskHookState {
		if (action.type === "add_tag") {
			return {
				...state,
				tagInputValue: action.payload as string[],
			};
		} else if (action.type === "add_externalLinkInput") {
			return {
				...state,
				linksInputs: [...state.linksInputs, { value: "" }],
			};
		} else if (action.type === "add_externalLinkValue") {
			return {
				...state,
				linksInputs: [...(action.payload as { value: string }[])],
			};
		} else if (action.type === "delete_externalLink") {
			return {
				...state,
				linksInputs: [...(action.payload as { value: string }[])],
			};
		} else if (action.type === "add_deadlineDate") {
			return {
				...state,
				datePickerValue: action.payload as Date,
			};
		}
		throw Error("Unknown action.");
	}

	const [state, dispatch] = useReducer(reducer, null, initialStateCreator);

	return { state, dispatch };
};
