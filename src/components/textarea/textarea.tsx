import { type FC, useId, useState } from "react";
import cn from "../../utils/cn";
import { FormFieldsLabelWithTooltip } from "../internals/form-fields-label-with-tooltip";

type Textarea = FC<{
	label: string;
	errorMessage: string;
	isErrored: boolean;
	isValid: boolean;
	placeholder: string;
}>;
export const Textarea: Textarea = ({
	label,
	isValid,
	isErrored,
	errorMessage,
	placeholder,
}) => {
	const [isErrorTooltipOpen, setIsErrorTooltipOpen] = useState(false);
	const labelId = useId();
	const errorMessageId = useId();
	return (
		<div className="ls-textarea-container">
			<FormFieldsLabelWithTooltip
				label={label}
				isValid={isValid}
				isErrored={isErrored}
				errorMessage={errorMessage}
				errorMessageId={errorMessageId}
				labelId={labelId}
				isErrorTooltipOpen={isErrorTooltipOpen}
				setIsErrorTooltipOpen={setIsErrorTooltipOpen}
			/>
			<textarea
				placeholder={placeholder}
				aria-labelledby={labelId}
				aria-describedby={errorMessageId}
				className={cn("ls-textarea", {
					"ls-textarea-valid": isValid,
					"ls-textarea-errored": isErrored,
				})}
			/>
		</div>
	);
};