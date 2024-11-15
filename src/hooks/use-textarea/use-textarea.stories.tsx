import type { Story } from "@ladle/react";
import { StoryContainer } from "../../../.ladle/components";
import { Button } from "../../components/button";
import { useTextarea } from "./use-textarea";

const placeholder = "Enter your description here";
const label = "Description";
const errorMessage = "Error message";
const defaultValue = "Default value";
const validator = () => true;

export const All: Story = () => {
	const [component1, , , reset1] = useTextarea({
		label,
		placeholder,
		errorMessage,
		validator,
		disabled: true,
	});
	const [component2, , , reset2] = useTextarea({
		label,
		placeholder,
		errorMessage,
		validator,
	});
	const [component3, , , reset3] = useTextarea({
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
	const [component4, , , reset4] = useTextarea({
		label,
		placeholder,
		errorMessage,
		defaultValue,
		validator,
	});
	const [component5, , , reset5] = useTextarea({
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
