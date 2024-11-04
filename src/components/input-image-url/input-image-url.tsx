import { useCallback, useEffect, useId, useState } from "react";
import type { FormField } from "../../types/form-field";
import cn from "../../utils/cn";
import { useValidationState } from "../../utils/useValidationState";
import { FormFieldsLabelWithTooltip } from "../internals/form-fields-label-with-tooltip";

export const InputImageUrl: FormField = ({
	label,
	errorMessage,
	placeholder,
	defaultValue,
	disabled,
}) => {
	const labelId = useId();
	const errorMessageId = useId();
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
	const validate = useCallback(
		(url: string) => {
			if (!url) {
				setIsErrored();
				return;
			}

			let isCancelled = false;

			const img = new Image();
			setIsValidating();
			img.onload = () => {
				if (!isCancelled) {
					setIsValid();
				}
			};

			// Define onerror handler
			img.onerror = () => {
				if (!isCancelled) {
					setIsErrored();
				}
			};

			// Set the source to trigger loading
			img.src = url;

			// Cleanup function to handle component unmounting
			return () => {
				isCancelled = true;
			};
		},
		[setIsErrored, setIsValid, setIsValidating],
	);
	useEffect(() => {
		if (defaultValue) {
			validate(defaultValue);
			setValue(defaultValue);
		}
	}, [defaultValue, validate]);

	return (
		<div className="ls-input-image-url-container">
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
				className={cn("ls-input-image-url", {
					"ls-input-image-url-valid": isValid,
					"ls-input-image-url-errored": isErrored,
				})}
				placeholder={placeholder}
				aria-labelledby={labelId}
				value={value}
				onChange={(e) => setValue(e.target.value)}
				onBlur={() => validate(value)}
				disabled={disabled}
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
					<img
						className="ls-image-preview"
						src={value}
						alt="Preview"
						style={{ maxWidth: "100%", maxHeight: "100%" }}
					/>
				)}
			</div>
		</div>
	);
};
