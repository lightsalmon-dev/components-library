import type { Story } from "@ladle/react";
import { StoryContainer } from "../../../.ladle/components";
import { Button } from "../../components/button";
import { useInputImageUrl } from "./use-input-image-url";

const placeholder = "Placeholder";
const label = "Label";
const errorMessage = "Error message";
const defaultValue = "https://placehold.co/1000x400";
const validator = () => true;

export const All: Story = () => {
	const [component1, , , reset1] = useInputImageUrl({
		label,
		placeholder,
		errorMessage,
		validator,
	});
	const [component2, , , reset2] = useInputImageUrl({
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
	const [component3, , , reset3] = useInputImageUrl({
		label,
		placeholder,
		errorMessage,
		defaultValue,
		validator,
	});
	const [component4, , , reset4] = useInputImageUrl({
		label,
		placeholder,
		errorMessage,
		defaultValue,
		validator,
	});
	const [component5, , , reset5] = useInputImageUrl({
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
