import type { Story } from "@ladle/react";
import { StoryContainer } from "../../../.ladle/components";
import { useDatepicker } from "./use-datepicker";

const label = "Select a date";
const errorMessage = "Please select a valid date.";
const defaultValue = new Date(2021, 0, 1);
const validator = () => true;

export const All: Story = () => {
	const [asDisabled] = useDatepicker({
		label: label,
		errorMessage: errorMessage,
		disabled: true,
		validator,
	});
	const [asPlaceholder] = useDatepicker({
		label: label,
		errorMessage: errorMessage,
		validator,
	});
	const [asWithDefaultValue] = useDatepicker({
		label: label,
		errorMessage: errorMessage,
		validator,
		defaultValue,
	});
	const [asAsyncValidation] = useDatepicker({
		label: label,
		errorMessage: errorMessage,
		validator: () =>
			new Promise((resolve) => setTimeout(() => resolve(true), 5000)),
		defaultValue,
	});
	const [asFailedValidation] = useDatepicker({
		label: label,
		errorMessage: errorMessage,
		validator: () => false,
		defaultValue,
	});

	return (
		<StoryContainer>
			{asDisabled}
			{asPlaceholder}
			{asWithDefaultValue}
			{asAsyncValidation}
			{asFailedValidation}
		</StoryContainer>
	);
};
