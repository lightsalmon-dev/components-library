import type { Story } from "@ladle/react";
import { z } from "zod";
import { StoryContainer } from "../../../.ladle/components";
import { useInput } from "./use-input";

const validator = (val: string) =>
	z.string().min(1).max(255).safeParse(val).success;

const placeholder = "Placeholder";
const label = "Label";
const errorMessage = "Error message";
const defaultValue = "Default value";

export const All: Story = () => {
	const [component1] = useInput({
		label,
		placeholder,
		errorMessage,
		validator,
	});
	const [component2] = useInput({
		label,
		placeholder,
		errorMessage,
		defaultValue,
		validator: (val) => {
			return new Promise((resolve) => {
				setTimeout(() => resolve(validator(val)), 5000);
			});
		},
	});
	const [component3] = useInput({
		label,
		placeholder,
		errorMessage,
		defaultValue,
		validator,
	});
	const [component4] = useInput({
		label,
		placeholder,
		errorMessage,
		defaultValue,
		validator: () => true,
	});
	const [component5] = useInput({
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
