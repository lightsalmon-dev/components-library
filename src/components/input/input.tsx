import { useCallback, useEffect, useRef, useState } from "react";
import type { FormField } from "../../types/form-field";
import cn from "../../utils/cn";
import { useFormFieldIds } from "../../utils/use-form-field-ids";
import { useValidationState } from "../../utils/use-validation-state";
import { FormFieldsLabelWithTooltip } from "../internals/form-fields-label-with-tooltip";

export const Input: FormField = ({
	className,
	label,
	errorMessage,
	placeholder,
	defaultValue,
	disabled,
	validator,
}) => {
	const { labelId, errorMessageId } = useFormFieldIds();
	const [isErrorTooltipOpen, setIsErrorTooltipOpen] = useState(false);
	const {
		isValid,
		isValidating,
		isErrored,
		setIsValid,
		setIsValidating,
		setIsErrored,
	} = useValidationState();
	const ref = useRef<HTMLInputElement>(null);

	// on blur, validate the input value
	const onBlur = useCallback(async () => {
		if (ref.current) {
			setIsValidating();
			setIsErrorTooltipOpen(false);
			const validationResult = await validator(ref.current.value);
			if (validationResult) {
				setIsValid();
			} else {
				setIsErrorTooltipOpen(true);
				setIsErrored();
			}
		}
	}, [setIsErrored, setIsValidating, setIsValid, validator]);

	// on focus, close the error tooltip
	const onFocus = () => setIsErrorTooltipOpen(false);

	// set the default value if it exists, and validate it
	useEffect(() => {
		if (defaultValue && ref.current) {
			ref.current.value = defaultValue;
			onBlur();
		}
	}, [defaultValue, onBlur]);

	return (
		<div className={cn("ls-form-field-container", className)}>
			<FormFieldsLabelWithTooltip
				label={label}
				isValid={isValid}
				isErrored={isErrored}
				isValidating={isValidating}
				errorMessage={errorMessage}
				labelId={labelId}
				errorMessageId={errorMessageId}
				isErrorTooltipOpen={isErrorTooltipOpen}
				setIsErrorTooltipOpen={setIsErrorTooltipOpen}
			/>
			<input
				disabled={disabled}
				ref={ref}
				type="text"
				placeholder={placeholder}
				className={cn("ls-form-field", {
					"ls-form-field-valid": isValid,
					"ls-form-field-invalid": isErrored,
				})}
				aria-invalid={isErrored}
				aria-errormessage={errorMessageId}
				aria-labelledby={labelId}
				onBlur={onBlur}
				onFocus={onFocus}
			/>
		</div>
	);
};
