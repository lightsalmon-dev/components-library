import type { FC } from "react";
import { IconCheckCircle } from "../../../icons/icon-check-circle";
import { IconExclamationCircle } from "../../../icons/icon-exclamation-circle";
import cn from "../../../utils/cn";

type FormFieldsLabelWithTooltip = FC<{
	label: string;
	isValid: boolean;
	isErrored: boolean;
	errorMessage: string;
	errorMessageId: string;
	labelId: string;
	isErrorTooltipOpen: boolean;
	setIsErrorTooltipOpen: (value: boolean) => void;
}>;
export const FormFieldsLabelWithTooltip: FormFieldsLabelWithTooltip = ({
	label,
	isValid,
	isErrored,
	errorMessage,
	errorMessageId,
	labelId,
	isErrorTooltipOpen,
	setIsErrorTooltipOpen,
}) => {
	return (
		<div className="ls-form-field-label-container">
			<label htmlFor={labelId} className={cn("ls-input-label")}>
				{label}
			</label>
			<span
				id={errorMessageId}
				className="ls-form-field-error-tooltip-container"
				aria-live="polite"
			>
				{isErrorTooltipOpen && (
					// biome-ignore lint/a11y/useKeyWithClickEvents: component it's already accessible
					<p
						className="ls-form-field-error-tooltip-text"
						onClick={() => setIsErrorTooltipOpen(false)}
					>
						{errorMessage}
					</p>
				)}
			</span>
			<IconCheckCircle
				className={cn("ls-form-field-icon", "ls-form-field-icon-valid", {
					"ls-form-field-icon-visible": isValid,
				})}
				aria-hidden={!isValid}
			/>
			<IconExclamationCircle
				className={cn("ls-form-field-icon", "ls-form-field-icon-errored", {
					"ls-form-field-icon-visible": isErrored,
				})}
				onClick={() => setIsErrorTooltipOpen(!isErrorTooltipOpen)}
				aria-hidden={!isErrored}
			/>
		</div>
	);
};
