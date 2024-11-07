import { useId } from "react";

export const useFormFieldIds = () => ({
	labelId: useId(),
	errorMessageId: useId(),
});
