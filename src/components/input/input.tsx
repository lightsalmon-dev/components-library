import {
	type ComponentProps,
	forwardRef,
	useCallback,
	useEffect,
	useId,
	useState,
} from "react";
import cn from "../../utils/cn";
import { FormFieldsLabelWithTooltip } from "../internals/form-fields-label-with-tooltip";

type InputProps = ComponentProps<"input"> & {
	label: string;
	placeholder: string;
	isValid: boolean;
	isErrored: boolean;
	errorMessage: string;
};
export const Input = forwardRef<HTMLInputElement, InputProps>(
	(
		{
			className,
			id,
			label,
			isValid,
			isErrored,
			onFocus,
			onBlur,
			errorMessage,
			...otherProps
		},
		ref,
	) => {
		const inputId = id ?? useId();
		const statusId = useId();

		const labelId = useId();
		const errorMessageId = useId();

		const [isErrorTooltipOpen, setIsErrorTooltipOpen] = useState(false);
		useEffect(() => {
			if (isErrored) {
				setIsErrorTooltipOpen(true);
			}
		}, [isErrored]);

		const localOnFocus = useCallback<
			Exclude<ComponentProps<"input">["onFocus"], undefined>
		>(
			(e) => {
				setIsErrorTooltipOpen(false);
				if (onFocus) {
					onFocus(e);
				}
			},
			[onFocus],
		);

		const localOnBlur = useCallback<
			Exclude<ComponentProps<"input">["onBlur"], undefined>
		>(
			(e) => {
				if (isErrored) {
					setIsErrorTooltipOpen(true);
				}
				if (onBlur) {
					onBlur(e);
				}
			},
			[onBlur, isErrored],
		);

		return (
			<div className={cn("ls-form-field-container", className)}>
				<FormFieldsLabelWithTooltip
					label={label}
					isValid={isValid}
					isErrored={isErrored}
					errorMessage={errorMessage}
					labelId={labelId}
					errorMessageId={errorMessageId}
					isErrorTooltipOpen={isErrorTooltipOpen}
					setIsErrorTooltipOpen={setIsErrorTooltipOpen}
				/>
				<input
					id={inputId}
					ref={ref}
					className={cn("ls-input", {
						"ls-input-valid": isValid,
						"ls-input-errored": isErrored,
					})}
					aria-describedby={statusId}
					aria-invalid={isErrored}
					aria-errormessage={errorMessageId}
					onFocus={localOnFocus}
					onBlur={localOnBlur}
					{...otherProps}
				/>
			</div>
		);
	},
);
