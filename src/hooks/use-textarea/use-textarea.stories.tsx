import type { Story } from "@ladle/react";
import { StoryContainer } from "../../../.ladle/components";
import { useTextarea } from "./use-textarea";

const placeholder = "Enter your description here";
const label = "Description";
const errorMessage = "Error message";
const defaultValue = "Default value";
const validator = () => true;

export const All: Story = () => {
	const [component1] = useTextarea({
		label,
		placeholder,
		errorMessage,
		validator,
		disabled: true,
	});
	const [component2] = useTextarea({
		label,
		placeholder,
		errorMessage,
		validator,
	});
	const [component3] = useTextarea({
		label,
		placeholder,
		errorMessage,
		defaultValue,
		validator: () => {
			return new Promise((resolve) => {
				setTimeout(() => resolve(true), 5000);
			});
		},
	});
	const [component4] = useTextarea({
		label,
		placeholder,
		errorMessage,
		defaultValue,
		validator,
	});
	const [component5] = useTextarea({
		label,
		placeholder,
		errorMessage,
		defaultValue,
		validator: () => false,
	});

	return (
		<StoryContainer>
			{component1}
			{component2}
			{component3}
			{component4}
			{component5}
		</StoryContainer>
	);
};
