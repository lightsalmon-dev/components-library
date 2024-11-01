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

export const All: Story = () => {
	return (
		<StoryContainer>
			<Select
				label="Fruits"
				placeholder="Select a fruit"
				options={options}
				isErrored={false}
				isValid={false}
				errorMessage="Change me via errorMessage prop"
			/>
			<Select
				label={"Fruits"}
				placeholder="Select a fruit"
				options={options}
				isErrored={false}
				isValid={false}
				errorMessage="Change me via errorMessage prop"
				defaultValue="banana"
			/>
			<Select
				label={"Fruits"}
				placeholder="Select a fruit"
				options={options}
				isErrored={false}
				isValid={true}
				errorMessage="Change me via errorMessage prop"
				defaultValue="banana"
			/>
			<Select
				label={"Fruits"}
				placeholder="Select a fruit"
				options={options}
				isErrored={true}
				isValid={false}
				errorMessage="Change me via errorMessage prop"
				defaultValue="banana"
			/>
		</StoryContainer>
	);
};
