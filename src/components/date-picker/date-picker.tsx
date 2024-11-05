import { type FC, useId, useState } from "react";
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
import type { PopoverProps as RACPopoverProps } from "react-aria-components";
import { IconCalendarDays } from "../../icons/icon-calendar-days";
import { IconChevronLeft } from "../../icons/icon-chevron-left";
import { IconChevronRight } from "../../icons/icon-chevron-right";
import cn from "../../utils/cn";
import { FormFieldsLabelWithTooltip } from "../internals/form-fields-label-with-tooltip";

type DatePicker = FC<{
	label: string;
	isValid: boolean;
	isErrored: boolean;
	errorMessage: string;
	disabled?: boolean;
}>;
export const DatePicker: DatePicker = ({
	label,
	isValid,
	isErrored,
	errorMessage,
	disabled = false,
}) => {
	const [isErrorTooltipOpen, setIsErrorTooltipOpen] = useState(false);
	const labelId = useId();
	const errorMessageId = useId();

	return (
		<RACDatePicker className="ls-form-field-container" isDisabled={disabled}>
			<FormFieldsLabelWithTooltip
				label={label}
				labelId={labelId}
				isErrored={isErrored}
				errorMessageId={errorMessageId}
				isValid={isValid}
				errorMessage={errorMessage}
				isErrorTooltipOpen={isErrorTooltipOpen}
				setIsErrorTooltipOpen={setIsErrorTooltipOpen}
			/>
			<RACGroup
				isInvalid={isErrored}
				isDisabled={disabled}
				aria-labelledby={labelId}
				aria-errormessage={errorMessageId}
				className={cn("ls-datepicker-fake-input-container", {
					"ls-datepicker-fake-input-container-valid": isValid,
					"ls-datepicker-fake-input-container-errored": isErrored,
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

function MyPopover(props: RACPopoverProps) {
	return (
		<RACPopover
			{...props}
			className={({ isEntering, isExiting }) => `
        overflow-auto rounded-lg drop-shadow-lg ring-1 ring-black/10 bg-white
        ${
					isEntering
						? "animate-in fade-in placement-bottom:slide-in-from-top-1 placement-top:slide-in-from-bottom-1 ease-out duration-200"
						: ""
				}
        ${
					isExiting
						? "animate-out fade-out placement-bottom:slide-out-to-top-1 placement-top:slide-out-to-bottom-1 ease-in duration-150"
						: ""
				}
      `}
		/>
	);
}
