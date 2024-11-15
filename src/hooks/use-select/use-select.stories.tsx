import type { Story } from "@ladle/react";
import { StoryContainer } from "../../../.ladle/components";
import { Button } from "../../components/button";
import { useSelect } from "./use-select";

const options = [
	{ label: "Apple", value: "apple" },
	{ label: "Banana", value: "banana" },
	{ label: "Cherry", value: "cherry" },
	{ label: "Date", value: "date" },
	{ label: "Elderberry", value: "elderberry" },
];

const label = "Label";
const placeholder = "Placeholder";
const errorMessage = "Error message";
const defaultValue = options[0];
const validator = () => true;

export const All: Story = () => {
	const [component1, , , reset1] = useSelect({
		label: label,
		placeholder: placeholder,
		options: options,
		errorMessage: errorMessage,
		disabled: true,
		validator,
	});
	const [component2, , , reset2] = useSelect({
		label: label,
		placeholder: placeholder,
		options: options,
		errorMessage: errorMessage,
		validator,
	});
	const [component3, , , reset3] = useSelect({
		label: label,
		placeholder: placeholder,
		options: options,
		errorMessage: errorMessage,
		validator,
		defaultValue,
	});
	const [component4, , , reset4] = useSelect({
		label: label,
		placeholder: placeholder,
		options: options,
		validator,
		errorMessage,
		defaultValue,
	});
	const [component5, , , reset5] = useSelect({
		label: label,
		placeholder: placeholder,
		options: options,
		validator: () => false,
		errorMessage,
		defaultValue,
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
