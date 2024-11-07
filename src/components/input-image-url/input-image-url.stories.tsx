import type { Story } from "@ladle/react";
import { StoryContainer } from "../../../.ladle/components";
import { InputImageUrl } from "./input-image-url";

const placeholder = "Placeholder";
const label = "Label";
const errorMessage = "Error message";
const defaultValue = "https://placehold.co/1000x400";

export const All: Story = () => {
	return (
		<StoryContainer>
			<InputImageUrl
				placeholder={placeholder}
				label={label}
				errorMessage={errorMessage}
				validator={() => true}
				disabled
			/>
			<InputImageUrl
				placeholder="Placeholder"
				label="Unfilled"
				errorMessage="Change me via errorMessage prop"
				defaultValue=""
				validator={() => true}
			/>
			<InputImageUrl
				placeholder="Placeholder"
				label="Unfilled"
				errorMessage="Change me via errorMessage prop"
				defaultValue={defaultValue}
				validator={(val: string) => {
					return new Promise((resolve) => {
						setTimeout(() => resolve(true), 5000);
					});
				}}
			/>
			<InputImageUrl
				placeholder={placeholder}
				label={label}
				errorMessage={errorMessage}
				defaultValue={defaultValue}
				validator={() => true}
			/>
			<InputImageUrl
				placeholder={placeholder}
				label={label}
				errorMessage={errorMessage}
				defaultValue={defaultValue}
				validator={() => false}
			/>
		</StoryContainer>
	);
};
