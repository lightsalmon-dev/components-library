import type { Story } from "@ladle/react";
import { StoryContainer } from "../../../.ladle/components";
import { DatePicker } from "./date-picker";

export const All: Story = () => {
	return (
		<StoryContainer>
			<DatePicker
				label="Select a date"
				isErrored={false}
				isValid={false}
				errorMessage=""
				disabled
			/>
			<DatePicker
				label="Select a date"
				isErrored={false}
				isValid={false}
				errorMessage=""
			/>
			<DatePicker
				label="Select a date"
				isErrored={false}
				isValid={true}
				errorMessage=""
			/>
			<DatePicker
				label="Select a date"
				isErrored={true}
				isValid={false}
				errorMessage="Please select a valid date."
			/>
		</StoryContainer>
	);
};
