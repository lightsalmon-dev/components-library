import type { Story } from "@ladle/react";
import { StoryContainer } from "../../../.ladle/components";
import { DatePicker } from "./date-picker";

const label = "Select a date";
const errorMessage = "Please select a valid date.";
const defaultValue = "2021-01-01";

export const All: Story = () => {
	return (
		<StoryContainer>
			<DatePicker
				label={label}
				validator={() => true}
				errorMessage={errorMessage}
				disabled
			/>
			<DatePicker
				label={label}
				validator={() => true}
				errorMessage={errorMessage}
			/>
			<DatePicker
				label={label}
				validator={() => true}
				errorMessage={errorMessage}
				defaultValue={defaultValue}
			/>
			<DatePicker
				label={label}
				validator={(val: string) => {
					return new Promise((resolve) => {
						setTimeout(() => resolve(true), 5000);
					});
				}}
				errorMessage={errorMessage}
				defaultValue={defaultValue}
			/>
			<DatePicker
				label={label}
				validator={() => false}
				defaultValue={defaultValue}
				errorMessage={errorMessage}
			/>
			{/*<DatePicker*/}
			{/*	label="Select a date"*/}
			{/*	isErrored={true}*/}
			{/*	isValid={false}*/}
			{/*	errorMessage="Please select a valid date."*/}
			{/*/>*/}
		</StoryContainer>
	);
};
