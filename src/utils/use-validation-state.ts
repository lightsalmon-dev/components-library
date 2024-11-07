import { useCallback, useState } from "react";

type ValidationState =
	| { isValid: false; isErrored: false; isValidating: false }
	| { isValid: true; isErrored: false; isValidating: false }
	| { isValid: false; isErrored: true; isValidating: false }
	| { isValid: false; isErrored: false; isValidating: true };

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
