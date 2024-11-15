import type { Story } from "@ladle/react";
import { z } from "zod";
import { StoryContainer } from "../../../.ladle/components";
import { Button } from "../../components/button";
import { useInput } from "./use-input";

const validator = (val: string) =>
	z.string().min(1).max(255).safeParse(val).success;

const placeholder = "Placeholder";
const label = "Label";
const errorMessage = "Error message";
const defaultValue = "Default value";

export const All: Story = () => {
	const [component1, , , reset1] = useInput({
		label,
		placeholder,
		errorMessage,
		validator,
	});
	const [component2, , , reset2] = useInput({
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
	const [component3, , , reset3] = useInput({
		label,
		placeholder,
		errorMessage,
		defaultValue,
		validator,
	});
	const [component4, , , reset4] = useInput({
		label,
		placeholder,
		errorMessage,
		defaultValue,
		validator: () => true,
	});
	const [component5, , , reset5] = useInput({
		label,
		placeholder,
		errorMessage,
		defaultValue,
		validator: () => false,
	});

	const resetAll = () => {
		reset1();
		reset2();
		reset3();
		reset4();
		reset5();
	};

	return (
		<StoryContainer>
			<Button variant="primary" onClick={resetAll}>
				Reset all field
			</Button>
			{component1}
			{component2}
			{component3}
			{component4}
			{component5}
		</StoryContainer>
	);
};
