import { type ComponentProps, useCallback, useEffect, useState } from "react";
import { FormFieldsLabelWithTooltip } from "../../components/internals/form-fields-label-with-tooltip";
import type { UseFormField } from "../../types/use-form-field";
import cn from "../../utils/cn";
import { useFormFieldIds } from "../../utils/use-form-field-ids";
import { useValidationState } from "../../utils/use-validation-state";
import { validateImageUrlCorrectness } from "../../utils/validate-image-url-correctness";

export const useInputImageUrl: UseFormField<string> = ({
	label,
	placeholder,
	defaultValue,
	errorMessage,
	disabled,
	validator,
	className,
}) => {
	const { labelId, errorMessageId } = useFormFieldIds();
	const [isErrorTooltipOpen, setIsErrorTooltipOpen] = useState(false);
	const {
		isValid,
		isErrored,
		isValidating,
		setIsValid,
		setIsErrored,
		setIsValidating,
	} = useValidationState();
	const [value, setValue] = useState("");

	// on mount
	// biome-ignore lint/correctness/useExhaustiveDependencies(validator): it's a function, so if not memoized it would cause infinite loop, i prefer to not put it in dependencies rather than asking the user to memoize it
	useEffect(() => {
		const fn = async () => {
			if (defaultValue) {
				setValue(defaultValue);
				setIsValidating();
				const [isARealImage, isValidated] = await Promise.all([
					validateImageUrlCorrectness(defaultValue),
					validator(defaultValue),
				]);
				if (isARealImage && isValidated) {
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

	// on focus, close the error tooltip
	const onFocus = () => setIsErrorTooltipOpen(false);

	// on change
	const onChange = useCallback<
		Exclude<ComponentProps<"input">["onChange"], undefined>
	>((e) => {
		setValue(e.target.value);
	}, []);

	// on blur, validate the input value and the image correctness
	const onBlur = useCallback(
		async (imageUrl: string) => {
			setIsValidating();
			const [isARealImage, isValidated] = await Promise.all([
				validateImageUrlCorrectness(imageUrl),
				validator(imageUrl),
			]);
			if (isARealImage && isValidated) {
				setIsValid();
			} else {
				setIsErrored();
				setIsErrorTooltipOpen(true);
			}
		},
		[setIsErrored, setIsValid, setIsValidating, validator],
	);

	return [
		// biome-ignore lint/correctness/useJsxKeyInIterable: it's in an iterator, yes, but is not really something you would iterate over
		<div className={cn("ls-form-field-container", className)}>
			<FormFieldsLabelWithTooltip
				label={label}
				isValid={isValid}
				isErrored={isErrored}
				errorMessage={errorMessage}
				errorMessageId={errorMessageId}
				labelId={labelId}
				isErrorTooltipOpen={isErrorTooltipOpen}
				setIsErrorTooltipOpen={setIsErrorTooltipOpen}
				isValidating={isValidating}
			/>
			<input
				type="url"
				className={cn("ls-form-field", {
					"ls-form-field-valid": isValid,
					"ls-form-field-invalid": isErrored,
				})}
				placeholder={placeholder}
				aria-labelledby={labelId}
				value={value}
				onChange={(e) => setValue(e.target.value)}
				disabled={disabled}
				onBlur={() => onBlur(value)}
				onFocus={onFocus}
			/>
			<div
				className={cn("ls-image-preview-container", {
					"ls-image-preview-container-valid": isValid,
					"ls-image-preview-container-errored": isErrored,
				})}
				aria-live="polite"
				aria-label="Image preview"
				role="img"
			>
				{isValid && (
					<img className="ls-image-preview" src={value} alt="Preview" />
				)}
			</div>
		</div>,
		value,
		isValid,
	];
};
