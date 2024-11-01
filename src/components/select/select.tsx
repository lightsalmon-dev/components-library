import * as RadixSelect from "@radix-ui/react-select";
import { type FC, useEffect, useId, useState } from "react";
import { IconCheckCircle } from "../../icons/icon-check-circle";
import { IconChevronDown } from "../../icons/icon-chevron-down";
import { IconChevronUp } from "../../icons/icon-chevron-up";
import { IconExclamationCircle } from "../../icons/icon-exclamation-circle";
import cn from "../../utils/cn";

type Select = FC<{
	label: string;
	placeholder: string;
	isValid: boolean;
	isErrored: boolean;
	errorMessage: string;
	options: Array<{ label: string; value: string }>;
	defaultValue?: string;
}>;

export const Select: Select = ({
	label,
	placeholder,
	options,
	isValid,
	isErrored,
	errorMessage,
	defaultValue,
}) => {
	const labelId = useId();
	const statusId = useId();

	const [isErrorTooltipOpen, setIsErrorTooltipOpen] = useState(false);
	useEffect(() => {
		if (isErrored) {
			setIsErrorTooltipOpen(true);
		}
	}, [isErrored]);

	return (
		<div className="ls-select-container">
			<div className="ls-select-label-container">
				{/* biome-ignore lint/a11y/noLabelWithoutControl: RadixUI does not use an input for the select component */}
				<label id={labelId} className="ls-select-label">
					{label}
				</label>
				<span
					id={statusId}
					className="ls-select-error-tooltip-container"
					aria-live="polite"
				>
					{isErrorTooltipOpen && (
						// biome-ignore lint/a11y/useKeyWithClickEvents: component it's already accessible
						<p
							className="ls-select-error-tooltip-text"
							onClick={() => setIsErrorTooltipOpen(false)}
						>
							{errorMessage}
						</p>
					)}
				</span>
				<IconCheckCircle
					className={cn("ls-select-icon", "ls-select-icon-valid", {
						"ls-select-icon-visible": isValid,
					})}
					aria-hidden={!isValid}
				/>
				<IconExclamationCircle
					className={cn("ls-select-icon", "ls-select-icon-errored", {
						"ls-select-icon-visible": isErrored,
					})}
					onClick={() => setIsErrorTooltipOpen(!isErrorTooltipOpen)}
					aria-hidden={!isErrored}
				/>
			</div>
			<RadixSelect.Root aria-labelledby={labelId} defaultValue={defaultValue}>
				<RadixSelect.Trigger
					className={cn("ls-select-trigger", {
						"ls-select-valid": isValid,
						"ls-select-errored": isErrored,
					})}
					aria-labelledby={labelId}
				>
					<RadixSelect.Value
						placeholder={
							<span
								className="ls-select-placeholder"
								aria-placeholder={placeholder}
							>
								{placeholder}
							</span>
						}
					/>
					<IconChevronDown className="ls-select-icon-chevron-down" />
				</RadixSelect.Trigger>
				<RadixSelect.Portal>
					<RadixSelect.Content className="ls-select-menu">
						<RadixSelect.ScrollUpButton className="ls-select-scroll-container">
							<IconChevronUp className="ls-select-scroll-icon" />
						</RadixSelect.ScrollUpButton>
						<RadixSelect.Viewport className="ls-select-menu-viewport">
							<RadixSelect.Group>
								{options.map(({ label, value }, i) => {
									const key = `${i}-${label}-${value}`;
									return (
										<RadixSelect.Item
											className="ls-select-menu-item"
											value={value}
											key={key}
										>
											<RadixSelect.ItemText>{label}</RadixSelect.ItemText>
										</RadixSelect.Item>
									);
								})}
							</RadixSelect.Group>
						</RadixSelect.Viewport>
						<RadixSelect.ScrollDownButton className="ls-select-scroll-container">
							<IconChevronDown className="ls-select-scroll-icon" />
						</RadixSelect.ScrollDownButton>
					</RadixSelect.Content>
				</RadixSelect.Portal>
			</RadixSelect.Root>
		</div>
	);
};
