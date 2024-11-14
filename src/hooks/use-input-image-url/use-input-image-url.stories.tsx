import type { Story } from "@ladle/react";
import { StoryContainer } from "../../../.ladle/components";
import { useInputImageUrl } from "./use-input-image-url";

const placeholder = "Placeholder";
const label = "Label";
const errorMessage = "Error message";
const defaultValue = "https://placehold.co/1000x400";
const validator = () => true;

export const All: Story = () => {
	const [component1] = useInputImageUrl({
		label,
		placeholder,
		errorMessage,
		validator,
	});
	const [component2] = useInputImageUrl({
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
	const [component3] = useInputImageUrl({
		label,
		placeholder,
		errorMessage,
		defaultValue,
		validator,
	});
	const [component4] = useInputImageUrl({
		label,
		placeholder,
		errorMessage,
		defaultValue,
		validator,
	});
	const [component5] = useInputImageUrl({
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
