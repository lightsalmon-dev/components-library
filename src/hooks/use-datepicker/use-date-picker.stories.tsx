import type { Story } from "@ladle/react";
import { StoryContainer } from "../../../.ladle/components";
import { Button } from "../../components/button";
import { useDatepicker } from "./use-datepicker";

const label = "Select a date";
const errorMessage = "Please select a valid date.";
const defaultValue = new Date(2021, 0, 1);
const validator = () => true;

export const All: Story = () => {
	const [asDisabled, , , reset1] = useDatepicker({
		label: label,
		errorMessage: errorMessage,
		disabled: true,
		validator,
	});
	const [asPlaceholder, , , reset2] = useDatepicker({
		label: label,
		errorMessage: errorMessage,
		validator,
	});
	const [asWithDefaultValue, , , reset3] = useDatepicker({
		label: label,
		errorMessage: errorMessage,
		validator,
		defaultValue,
	});
	const [asAsyncValidation, , , reset4] = useDatepicker({
		label: label,
		errorMessage: errorMessage,
		validator: () =>
			new Promise((resolve) => setTimeout(() => resolve(true), 5000)),
		defaultValue,
	});
	const [asFailedValidation, , , reset5] = useDatepicker({
		label: label,
		errorMessage: errorMessage,
		validator: () => false,
		defaultValue,
	});
	const resetAll = () => {
		reset1();
		reset2();
		reset3();
		reset4();
		reset5();
	};

	return (
		<StoryContainer>
			<Button variant="primary" onClick={resetAll}>
				Reset all field
			</Button>
			{asDisabled}
			{asPlaceholder}
			{asWithDefaultValue}
			{asAsyncValidation}
			{asFailedValidation}
		</StoryContainer>
	);
};
