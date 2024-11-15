import { type ComponentProps, useCallback, useEffect, useState } from "react";
import { FormFieldsLabelWithTooltip } from "../../components/internals/form-fields-label-with-tooltip";
import type {
	UseFormField,
	UseFormFieldReturnValue,
} from "../../types/use-form-field";
import cn from "../../utils/cn";
import { useFormFieldIds } from "../../utils/use-form-field-ids";
import { useValidationState } from "../../utils/use-validation-state";

export const useInput: UseFormField<string> = ({
	label,
	placeholder,
	defaultValue,
	errorMessage,
	disabled,
	validator,
	className,
}) => {
	const [value, setValue] = useState("");
	const {
		isValid,
		isValidating,
		isErrored,
		setIsValid,
		setIsValidating,
		setIsErrored,
		resetValidation,
	} = useValidationState();
	const [isErrorTooltipOpen, setIsErrorTooltipOpen] = useState(false);
	const { labelId, errorMessageId } = useFormFieldIds();

	// on mount
	// biome-ignore lint/correctness/useExhaustiveDependencies(validator): it's a function, so if not memoized it would cause infinite loop, i prefer to not put it in dependencies rather than asking the user to memoize it
	useEffect(() => {
		const fn = async () => {
			if (defaultValue) {
				setValue(defaultValue);
				setIsValidating();
				const validationResult = await validator(defaultValue);
				if (validationResult) {
					setIsValid();
				} else {
					setIsErrored();
					setIsErrorTooltipOpen(true);
				}
			}
		};
		fn();
		// adding validator to dependencies would cause infinite loop because it's a function
	}, [defaultValue, setIsErrored, setIsValidating, setIsValid]);

	// on focus
	const onFocus = useCallback(() => {
		setIsErrorTooltipOpen(false);
	}, []);

	// on change
	const onChange = useCallback<
		Exclude<ComponentProps<"input">["onChange"], undefined>
	>((e) => {
		setValue(e.target.value);
	}, []);

	// on blur
	// biome-ignore lint/correctness/useExhaustiveDependencies(validator): it's a function, so if not memoized it would cause infinite loop, i prefer to not put it in dependencies rather than asking the user to memoize it
	const onBlur = useCallback(
		async (value: string) => {
			setIsValidating();
			setIsErrorTooltipOpen(false);
			const validationResult = await validator(value);
			if (validationResult) {
				setIsValid();
			} else {
				setIsErrorTooltipOpen(true);
				setIsErrored();
			}
		},
		[setIsErrored, setIsValidating, setIsValid],
	);

	const reset = useCallback<UseFormFieldReturnValue["3"]>(
		(shouldSetDefaultValue = true) => {
			if (shouldSetDefaultValue && defaultValue) {
				setValue(defaultValue);
			} else {
				setValue("");
			}
			resetValidation();
			setIsErrorTooltipOpen(false);
		},
		[resetValidation, defaultValue],
	);

	return [
		// biome-ignore lint/correctness/useJsxKeyInIterable: it's in an iterator, yes, but is not really something you would iterate over
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
				value={value}
				onChange={onChange}
				onFocus={onFocus}
				onBlur={() => onBlur(value)}
				disabled={disabled}
				type="text"
				placeholder={placeholder}
				className={cn("ls-form-field", {
					"ls-form-field-valid": isValid,
					"ls-form-field-invalid": isErrored,
				})}
				aria-invalid={isErrored}
				aria-errormessage={errorMessageId}
				aria-labelledby={labelId}
			/>
		</div>,
		value,
		isValid,
		reset,
	];
};
