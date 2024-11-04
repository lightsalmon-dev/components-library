import { useCallback, useState } from "react";

type UntouchedState = {
	isValid: false;
	isErrored: false;
	isValidating: false;
};
type ValidState = {
	isValid: true;
	isErrored: false;
	isValidating: false;
};
type ErroredState = {
	isValid: false;
	isErrored: true;
	isValidating: false;
};
type LoadingState = {
	isValid: false;
	isErrored: false;
	isValidating: true;
};
type ValidationState =
	| UntouchedState
	| ValidState
	| ErroredState
	| LoadingState;

export const useValidationState = () => {
	const [state, setState] = useState<ValidationState>({
		isValid: false,
		isErrored: false,
		isValidating: false,
	});

	const setIsErrored = useCallback(() => {
		setState({ isValid: false, isErrored: true, isValidating: false });
	}, []);

	const setIsValid = useCallback(() => {
		setState({ isValid: true, isErrored: false, isValidating: false });
	}, []);

	const setIsValidating = useCallback(() => {
		setState({ isValid: false, isErrored: false, isValidating: true });
	}, []);

	return {
		...state,
		setIsErrored,
		setIsValid,
		setIsValidating,
	};
};
