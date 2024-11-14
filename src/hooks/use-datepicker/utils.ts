import { CalendarDate } from "@internationalized/date";

export const fromDateToCalendarDate = (date: Date): CalendarDate => {
	return new CalendarDate(
		date.getFullYear(),
		date.getMonth() + 1,
		date.getDate(),
	);
};
