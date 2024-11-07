import { type CalendarDate, parseDate } from "@internationalized/date";
import {
	type ComponentProps,
	type FC,
	useCallback,
	useEffect,
	useState,
} from "react";
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
import { IconCalendarDays } from "../../icons/icon-calendar-days";
import { IconChevronLeft } from "../../icons/icon-chevron-left";
import { IconChevronRight } from "../../icons/icon-chevron-right";
import type { FormField } from "../../types/form-field";
import cn from "../../utils/cn";
import { useFormFieldIds } from "../../utils/use-form-field-ids";
import { useValidationState } from "../../utils/use-validation-state";
import { FormFieldsLabelWithTooltip } from "../internals/form-fields-label-with-tooltip";

// placeholder prop is omitted as the datepicker has a fixed placeholder like "MM/DD/YYYY"
type DatePicker = FC<Omit<ComponentProps<FormField>, "placeholder">>;
export const DatePicker: DatePicker = ({
	label,
	defaultValue,
	errorMessage,
	className,
	validator,
	disabled,
}) => {
	const { labelId, errorMessageId } = useFormFieldIds();
	const [isErrorTooltipOpen, setIsErrorTooltipOpen] = useState(false);
	const [value, setValue] = useState<CalendarDate>();
	const {
		isValid,
		isErrored,
		isValidating,
		setIsErrored,
		setIsValid,
		setIsValidating,
	} = useValidationState();

	// on blur, validate the input value
	const onBlur = useCallback(async () => {
		setIsValidating();
		setIsErrorTooltipOpen(false);
		const validationResult = await validator(value);
		if (validationResult) {
			setIsValid();
		} else {
			setIsErrorTooltipOpen(true);
			setIsErrored();
		}
	}, [value, setIsErrored, setIsValidating, setIsValid, validator]);

	// on focus, close the error tooltip
	const onFocus = () => setIsErrorTooltipOpen(false);

	// set the default value if it exists, and v
	// biome-ignore lint/correctness/useExhaustiveDependencies(onBlur):
	useEffect(() => {
		if (defaultValue) {
			setValue(parseDate(defaultValue));
			onBlur();
		}
	}, [defaultValue]);

	return (
		<RACDatePicker
			className={cn("ls-form-field-container", className)}
			isDisabled={disabled}
			onFocus={onFocus}
			onBlur={onBlur}
			value={value}
			onChange={(value) => setValue(value)}
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
		</RACDatePicker>
	);
};
