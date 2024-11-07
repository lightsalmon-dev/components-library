import { useCallback, useEffect, useState } from "react";
import type { FormField } from "../../types/form-field";
import cn from "../../utils/cn";
import { useFormFieldIds } from "../../utils/use-form-field-ids";
import { useValidationState } from "../../utils/use-validation-state";
import { validateImageUrlCorrectness } from "../../utils/validate-image-url-correctness";
import { FormFieldsLabelWithTooltip } from "../internals/form-fields-label-with-tooltip";

export const InputImageUrl: FormField = ({
	label,
	errorMessage,
	placeholder,
	defaultValue,
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
	// on focus, close the error tooltip
	const onFocus = () => setIsErrorTooltipOpen(false);

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

	useEffect(() => {
		if (defaultValue) {
			setValue(defaultValue);
			onBlur(defaultValue);
		}
	}, [defaultValue, onBlur]);

	return (
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
		</div>
	);
};
