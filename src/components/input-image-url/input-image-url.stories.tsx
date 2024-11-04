import type { Story } from "@ladle/react";
import { StoryContainer } from "../../../.ladle/components";
import { InputImageUrl } from "./input-image-url";

export const All: Story = () => {
	return (
		<StoryContainer>
			<InputImageUrl
				placeholder="Placeholder"
				label="Unfilled"
				errorMessage="Change me via errorMessage prop"
				defaultValue=""
			/>
			<InputImageUrl
				placeholder="Placeholder"
				label="Valid"
				errorMessage="Change me via errorMessage prop"
				defaultValue={""}
			/>
			<InputImageUrl
				placeholder="Placeholder"
				label="Filled"
				errorMessage="Change me via errorMessage prop"
				defaultValue={"https://placehold.co/400"}
			/>
			<InputImageUrl
				placeholder="Placeholder"
				label="Slow to load"
				errorMessage="Change me via errorMessage prop"
				defaultValue={"https://via.placeholder.com"}
			/>
			<InputImageUrl
				placeholder="Placeholder"
				label="Errored"
				errorMessage="Change me via errorMessage prop"
				defaultValue={"this is not a url"}
			/>
		</StoryContainer>
	);
};
