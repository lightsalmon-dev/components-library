import cn from "classnames";
import {
	type ComponentProps,
	forwardRef,
	useCallback,
	useEffect,
	useId,
	useState,
} from "react";
import { IconCheckCircle } from "../../icons/icon-check-circle";
import { IconExclamationCircle } from "../../icons/icon-exclamation-circle";

type InputProps = ComponentProps<"input"> & {
	label: string;
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
			<div className={cn("ls-input-container", className)}>
				<div className="ls-input-label-container">
					<label htmlFor={inputId} className={cn("ls-input-label")}>
						{label}
					</label>
					<span
						id={statusId}
						className="ls-error-tooltip-container"
						aria-live="polite"
					>
						{isErrorTooltipOpen && (
							// biome-ignore lint/a11y/useKeyWithClickEvents: component it's already accessible
							<p
								className="ls-error-tooltip-text"
								onClick={() => setIsErrorTooltipOpen(false)}
							>
								{errorMessage}
							</p>
						)}
					</span>
					<IconCheckCircle
						className={cn("ls-input-icon", "ls-icon-valid", {
							"ls-icon-visible": isValid,
						})}
						aria-hidden={!isValid}
					/>
					<IconExclamationCircle
						className={cn("ls-input-icon", "ls-icon-errored", {
							"ls-icon-visible": isErrored,
						})}
						onClick={() => setIsErrorTooltipOpen(!isErrorTooltipOpen)}
						aria-hidden={!isErrored}
					/>
				</div>
				<input
					id={inputId}
					ref={ref}
					className={cn("ls-input", {
						"ls-valid": isValid,
						"ls-errored": isErrored,
					})}
					aria-describedby={statusId}
					onFocus={localOnFocus}
					onBlur={localOnBlur}
					{...otherProps}
				/>
			</div>
		);
	},
);
