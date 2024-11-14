import type { Story } from "@ladle/react";
import { StoryContainer } from "../../../.ladle/components";
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
	const [component1] = useSelect({
		label: label,
		placeholder: placeholder,
		options: options,
		errorMessage: errorMessage,
		disabled: true,
		validator,
	});
	const [component2] = useSelect({
		label: label,
		placeholder: placeholder,
		options: options,
		errorMessage: errorMessage,
		validator,
	});
	const [component3] = useSelect({
		label: label,
		placeholder: placeholder,
		options: options,
		errorMessage: errorMessage,
		validator,
		defaultValue,
	});
	const [component4] = useSelect({
		label: label,
		placeholder: placeholder,
		options: options,
		validator,
		errorMessage,
		defaultValue,
	});
	const [component5] = useSelect({
		label: label,
		placeholder: placeholder,
		options: options,
		validator: () => false,
		errorMessage,
		defaultValue,
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
