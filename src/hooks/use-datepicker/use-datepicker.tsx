import { type CalendarDate, getLocalTimeZone } from "@internationalized/date";
import { useCallback, useEffect, useState } from "react";
import {
	Button as RACButton,
	Calendar as RACCalendar,
	CalendarCell as RACCalendarCell,
	CalendarGrid as RACCalendarGrid,
	CalendarGridBody as RACCalendarGridBody,
	CalendarGridHeader as RACCalendarGridHeader,
	CalendarHeaderCell as RACCalendarHeaderCell,
	DateInput as RACDateInput,
	DatePicker as RACDatePicker,
	DateSegment as RACDateSegment,
	Dialog as RACDialog,
	Group as RACGroup,
	Heading as RACHeading,
	Popover as RACPopover,
} from "react-aria-components";
import { FormFieldsLabelWithTooltip } from "../../components/internals/form-fields-label-with-tooltip";
import { IconCalendarDays } from "../../icons/icon-calendar-days";
import { IconChevronLeft } from "../../icons/icon-chevron-left";
import { IconChevronRight } from "../../icons/icon-chevron-right";
import type {
	UseFormFieldOptions,
	UseFormFieldReturnValue,
} from "../../types/use-form-field";
import cn from "../../utils/cn";
import { useFormFieldIds } from "../../utils/use-form-field-ids";
import { useValidationState } from "../../utils/use-validation-state";
import { fromDateToCalendarDate } from "./utils";

type Generic = Date | undefined;
type UseDatepicker = (
	options: Omit<UseFormFieldOptions<Generic>, "placeholder">,
) => UseFormFieldReturnValue<Generic>;
export const useDatepicker: UseDatepicker = ({
	label,
	disabled,
	validator,
	className,
	defaultValue,
	errorMessage,
}) => {
	const [value, setValue] = useState<Generic>(undefined);
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
	useEffect(() => {
		const fn = async () => {
			if (defaultValue) {
				setValue(defaultValue);
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
	}, [defaultValue, setIsErrored, setIsValidating, setIsValid]);

	// on focus
	const onFocus = useCallback(() => {
		setIsErrorTooltipOpen(false);
	}, []);

	// on change
	const onChange = useCallback(
		(newValue: CalendarDate) => {
			if (!newValue) {
				setValue(undefined);
				setIsErrored();
				setIsErrorTooltipOpen(true);
			} else {
				setValue(newValue.toDate(getLocalTimeZone()));
			}
		},
		[setIsErrored],
	);

	// on blur
	// biome-ignore lint/correctness/useExhaustiveDependencies(validator): it's a function, so if not memoized it would cause infinite loop, i prefer to not put it in dependencies rather than asking the user to memoize it
	const onBlur = useCallback(
		async (value: Generic) => {
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
		[setIsErrored, setIsValidating, setIsValid],
	);

	const reset = useCallback<UseFormFieldReturnValue["3"]>(
		(shouldSetDefaultValue = true) => {
			if (shouldSetDefaultValue && defaultValue) {
				setValue(defaultValue);
			} else {
				setValue(undefined);
			}
			resetValidation();
			setIsErrorTooltipOpen(false);
		},
		[resetValidation, defaultValue],
	);

	return [
		// biome-ignore lint/correctness/useJsxKeyInIterable: it's in an iterator, yes, but is not really something you would iterate over
		<RACDatePicker
			className={cn("ls-form-field-container", className)}
			isDisabled={disabled}
			onFocus={onFocus}
			onBlur={() => onBlur(value)}
			value={value ? fromDateToCalendarDate(value) : undefined}
			onChange={onChange}
			aria-labelledby={labelId}
			aria-errormessage={errorMessageId}
		>
			<FormFieldsLabelWithTooltip
				label={label}
				labelId={labelId}
				errorMessageId={errorMessageId}
				isValidating={isValidating}
				isValid={isValid}
				isErrored={isErrored}
				errorMessage={errorMessage}
				isErrorTooltipOpen={isErrorTooltipOpen}
				setIsErrorTooltipOpen={setIsErrorTooltipOpen}
			/>
			<RACGroup
				isInvalid={isErrored}
				isDisabled={disabled}
				className={cn("ls-form-field", "ls-datepicker-fake-input-container", {
					"ls-form-field-valid": isValid,
					"ls-form-field-invalid": isErrored,
				})}
				aria-disabled={disabled}
			>
				<RACDateInput className="ls-datepicker-fake-input">
					{(segment) => (
						<RACDateSegment
							segment={segment}
							className="ls-datepicker-fake-input-segment"
						/>
					)}
				</RACDateInput>
				<RACButton
					className="ls-datepicker-fake-input-button"
					isDisabled={disabled}
				>
					<IconCalendarDays className="ls-datepicker-fake-input-button-icon" />
				</RACButton>
			</RACGroup>
			<RACPopover>
				<RACDialog
					className={cn("ls-datepicker-dialog", {
						"ls-datepicker-dialog-valid": isValid,
						"ls-datepicker-dialog-errored": isErrored,
					})}
				>
					<RACCalendar>
						<header className="ls-datepicker-dialog-header">
							<RACButton
								slot="previous"
								className="ls-datepicker-dialog-header-button"
							>
								<IconChevronLeft className="ls-datepicker-dialog-header-button-icon" />
							</RACButton>
							<RACHeading className="ls-datepicker-dialog-month" />
							<RACButton
								slot="next"
								className="ls-datepicker-dialog-header-button"
							>
								<IconChevronRight className="ls-datepicker-dialog-header-button-icon" />
							</RACButton>
						</header>
						<RACCalendarGrid className="ls-datepicker-calendar">
							<RACCalendarGridHeader className="ls-datepicker-calendar-header">
								{(day) => (
									<RACCalendarHeaderCell className="ls-datepicker-calendar-header-cell">
										{day}
									</RACCalendarHeaderCell>
								)}
							</RACCalendarGridHeader>
							<RACCalendarGridBody>
								{(date) => (
									<RACCalendarCell
										date={date}
										className="ls-datepicker-calendar-body-cell"
									/>
								)}
							</RACCalendarGridBody>
						</RACCalendarGrid>
					</RACCalendar>
				</RACDialog>
			</RACPopover>
		</RACDatePicker>,
		value,
		isValid,
		reset,
	];
};
