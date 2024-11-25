import * as RadixSelect from "@radix-ui/react-select";
import { useCallback, useEffect, useState } from "react";
import { FormFieldsLabelWithTooltip } from "../../components/internals/form-fields-label-with-tooltip";
import { IconChevronDown } from "../../icons/icon-chevron-down";
import { IconChevronUp } from "../../icons/icon-chevron-up";
import type {
	UseFormFieldOptions,
	UseFormFieldReturnValue,
} from "../../types/use-form-field";
import cn from "../../utils/cn";
import { useFormFieldIds } from "../../utils/use-form-field-ids";
import { useValidationState } from "../../utils/use-validation-state";

type SelectOption = { label: string; value: string };
type UseSelect = (
	options: Omit<
		UseFormFieldOptions<SelectOption | undefined>,
		"defaultValue"
	> & {
		defaultValue?: SelectOption;
		options: SelectOption[];
	},
) => UseFormFieldReturnValue<SelectOption | undefined>;

export const useSelect: UseSelect = ({
	label,
	placeholder,
	defaultValue,
	options,
	errorMessage,
	disabled,
	validator,
	className,
}) => {
	const [value, setValue] = useState<SelectOption | undefined>(defaultValue);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [hasBeenTouched, setHasBeenTouched] = useState(false);
	const {
		isValid,
		isValidating,
		isErrored,
		setIsValid,
		setIsValidating,
		setIsErrored,
		resetValidation,
	} = useValidationState();
	const [isErrorTooltipOpen, setIsErrorTooltipOpen] = useState(false);
	const { labelId, errorMessageId } = useFormFieldIds();

	// on mount
	// biome-ignore lint/correctness/useExhaustiveDependencies(validator): it's a function, so if not memoized it would cause infinite loop, i prefer to not put it in dependencies rather than asking the user to memoize it
	// biome-ignore lint/correctness/useExhaustiveDependencies(defaultValue): it's a function, so if not memoized it would cause infinite loop, i prefer to not put it in dependencies rather than asking the user to memoize it
	useEffect(() => {
		const fn = async () => {
			if (defaultValue) {
				setIsValidating();
				const validationResult = await validator(defaultValue);
				if (validationResult) {
					setIsValid();
				} else {
					setIsErrored();
					setIsErrorTooltipOpen(true);
				}
			}
		};
		fn();
		// adding validator to dependencies would cause infinite loop because it's a function
	}, [setIsErrored, setIsValidating, setIsValid]);

	// on value change will work similarly to onChange in other form fields, with the difference that we first need to find the selected option
	const onValueChange = useCallback(
		async (value: string) => {
			setIsValidating();
			const selectedOption = options.find((option) => option.value === value);
			const validationResult = await validator(selectedOption);
			if (validationResult) {
				setIsValid();
				setIsErrorTooltipOpen(false);
			} else {
				setIsErrorTooltipOpen(true);
				setIsErrored();
			}
			setValue(selectedOption);
		},
		[options, setIsErrored, setIsValidating, setIsValid, validator],
	);

	const onOpenChange = useCallback((isOpen: boolean) => {
		if (isOpen) {
			setIsErrorTooltipOpen(false);
		}
		setIsMenuOpen(isOpen);
		setHasBeenTouched(true);
	}, []);

	useEffect(() => {
		if (!value && !isMenuOpen && hasBeenTouched) {
			setIsErrored();
			setIsErrorTooltipOpen(true);
		}
	}, [value, isMenuOpen, setIsErrored, hasBeenTouched]);

	const reset = useCallback<UseFormFieldReturnValue["3"]>(
		(shouldSetDefaultValue = true) => {
			if (shouldSetDefaultValue && defaultValue) {
				setValue(defaultValue);
			} else {
				setValue(undefined);
			}
			resetValidation();
			setIsErrorTooltipOpen(false);
			setHasBeenTouched(false);
		},
		[resetValidation, defaultValue],
	);

	return [
		// biome-ignore lint/correctness/useJsxKeyInIterable: it's in an iterator, yes, but is not really something you would iterate over
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
				value={
					options.find((option) => option.value === value?.value)?.value || ""
				}
				onValueChange={onValueChange}
				open={isMenuOpen}
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
		</div>,
		value,
		isValid,
		reset,
	];
};
