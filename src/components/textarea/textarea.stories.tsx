import type { Story } from "@ladle/react";
import { StoryContainer } from "../../../.ladle/components";
import { Textarea } from "./textarea";

export const All: Story = () => {
	return (
		<StoryContainer>
			<Textarea
				placeholder="Enter your description here"
				label="Description"
				isValid={false}
				isErrored={false}
				errorMessage="Change me via errorMessage prop"
			/>
			<Textarea
				placeholder="Enter your description here"
				label="Description"
				isValid={false}
				isErrored={false}
				errorMessage="Change me via errorMessage prop"
			/>
			<Textarea
				placeholder="Enter your description here"
				label="Description"
				isValid={true}
				isErrored={false}
				errorMessage="Change me via errorMessage prop"
			/>
			<Textarea
				placeholder="Enter your description here"
				label="Description"
				isValid={false}
				isErrored={true}
				errorMessage="Change me via errorMessage prop"
			/>
		</StoryContainer>
	);
};
