import type { Story } from "@ladle/react";
import { z } from "zod";
import { StoryContainer } from "../../../.ladle/components";
import { Input } from "./input";

const validator = (val: string) =>
	z.string().min(1).max(255).safeParse(val).success;

const placeholder = "Placeholder";
const label = "Label";
const errorMessage = "Error message";
const defaultValue = "Default value";

export const All: Story = () => {
	return (
		<StoryContainer>
			<Input
				placeholder={placeholder}
				label={label}
				errorMessage={errorMessage}
				validator={validator}
			/>
			<Input
				placeholder={placeholder}
				label={label}
				errorMessage={errorMessage}
				defaultValue={defaultValue}
				validator={(val: string) => {
					return new Promise((resolve) => {
						setTimeout(() => resolve(validator(val)), 5000);
					});
				}}
			/>
			<Input
				placeholder={placeholder}
				label={label}
				errorMessage={errorMessage}
				defaultValue={defaultValue}
				validator={validator}
			/>
			<Input
				placeholder={placeholder}
				label={label}
				errorMessage={errorMessage}
				defaultValue={defaultValue}
				validator={() => true}
			/>
			<Input
				placeholder={placeholder}
				label={label}
				errorMessage={errorMessage}
				defaultValue={defaultValue}
				validator={() => false}
			/>
		</StoryContainer>
	);
};
