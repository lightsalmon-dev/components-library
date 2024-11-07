import type { Story } from "@ladle/react";
import { StoryContainer } from "../../../.ladle/components";
import { Textarea } from "./textarea";

const placeholder = "Enter your description here";
const label = "Description";
const errorMessage = "Error message";
const defaultValue = "Default value";

export const All: Story = () => {
	return (
		<StoryContainer>
			<Textarea
				placeholder={placeholder}
				label={label}
				errorMessage={errorMessage}
				disabled
				validator={() => true}
			/>
			<Textarea
				placeholder={placeholder}
				label={label}
				errorMessage={errorMessage}
				validator={() => true}
			/>
			<Textarea
				placeholder={placeholder}
				label={label}
				errorMessage={errorMessage}
				validator={() => {
					return new Promise((resolve) => {
						setTimeout(() => resolve(true), 5000);
					});
				}}
				defaultValue={defaultValue}
			/>
			<Textarea
				placeholder={placeholder}
				label={label}
				errorMessage={errorMessage}
				validator={() => true}
				defaultValue={defaultValue}
			/>
			<Textarea
				placeholder={placeholder}
				label={label}
				errorMessage={errorMessage}
				validator={() => false}
				defaultValue={defaultValue}
			/>
		</StoryContainer>
	);
};
