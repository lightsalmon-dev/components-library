import * as RadixSelect from "@radix-ui/react-select";
import {
	type ComponentProps,
	type FC,
	useCallback,
	useEffect,
	useState,
} from "react";
import { IconChevronDown } from "../../icons/icon-chevron-down";
import { IconChevronUp } from "../../icons/icon-chevron-up";
import type { FormField } from "../../types/form-field";
import cn from "../../utils/cn";
import { useFormFieldIds } from "../../utils/use-form-field-ids";
import { useValidationState } from "../../utils/use-validation-state";
import { FormFieldsLabelWithTooltip } from "../internals/form-fields-label-with-tooltip";

type Select = FC<
	ComponentProps<FormField> & {
		options: Array<{ label: string; value: string }>;
	}
>;

export const Select: Select = ({
	label,
	placeholder,
	options,
	errorMessage,
	defaultValue,
	disabled,
	className,
	validator,
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
	const [value, setValue] = useState(defaultValue);

	// on open change will work similarly to onFocus in other form fields, unfortunately onFocus is not available in Radix Select
	const onOpenChange = (isOpen: boolean) => {
		if (isErrored) {
			setIsErrorTooltipOpen(!isOpen);
		}
	};

	// on value change will work similarly to onBlur in other form fields, unfortunately onBlur is not available in Radix Select
	const onValueChange = useCallback(
		async (value: string) => {
			setValue(value);
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
		[setIsErrored, setIsValidating, setIsValid, validator],
	);

	useEffect(() => {
		if (defaultValue) {
			onValueChange(defaultValue);
		}
	}, [defaultValue, onValueChange]);

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
				isValidating={isValidating}
			/>
			<RadixSelect.Root
				aria-labelledby={labelId}
				defaultValue={defaultValue}
				value={value}
				onValueChange={onValueChange}
				onOpenChange={onOpenChange}
				disabled={disabled}
			>
				<RadixSelect.Trigger
					className={cn("ls-form-field", "ls-select-trigger", {
						"ls-form-field-valid": isValid,
						"ls-form-field-invalid": isErrored,
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
