import * as RadixSelect from "@radix-ui/react-select";
import { type FC, useEffect, useId, useState } from "react";
import { IconChevronDown } from "../../icons/icon-chevron-down";
import { IconChevronUp } from "../../icons/icon-chevron-up";
import cn from "../../utils/cn";
import { FormFieldsLabelWithTooltip } from "../internals/form-fields-label-with-tooltip";

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
	const errorMessageId = useId();

	const [isErrorTooltipOpen, setIsErrorTooltipOpen] = useState(false);
	useEffect(() => {
		if (isErrored) {
			setIsErrorTooltipOpen(true);
		}
	}, [isErrored]);

	return (
		<div className="ls-form-field-container">
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
