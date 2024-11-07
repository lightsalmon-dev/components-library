import type { Story } from "@ladle/react";
import { StoryContainer } from "../../../.ladle/components";
import { Select } from "./select";

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
const defaultValue = "banana";

export const All: Story = () => {
	return (
		<StoryContainer>
			<Select
				label={label}
				placeholder={placeholder}
				options={options}
				validator={() => true}
				disabled
				errorMessage={errorMessage}
			/>

			<Select
				label={label}
				placeholder={placeholder}
				options={options}
				validator={() => true}
				errorMessage={errorMessage}
				defaultValue={defaultValue}
			/>
			<Select
				label={label}
				placeholder={placeholder}
				options={options}
				validator={(val: string) => {
					return new Promise((resolve) => {
						setTimeout(() => resolve(true), 5000);
					});
				}}
				errorMessage="Change me via errorMessage prop"
				defaultValue="banana"
			/>
			<Select
				label={label}
				placeholder={placeholder}
				options={options}
				validator={() => false}
				errorMessage={errorMessage}
				defaultValue={defaultValue}
			/>
		</StoryContainer>
	);
};
