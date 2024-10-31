import type { Story } from "@ladle/react";
import { Input } from "./input";
import styles from "./input.stories.module.scss";

export const All: Story = () => {
	return (
		<div className={styles.container}>
			<Input
				placeholder="Placeholder"
				label="Unfilled"
				isValid={false}
				isErrored={false}
				errorMessage="Change me via errorMessage prop"
			/>
			<Input
				placeholder="Placeholder"
				label="Filled"
				defaultValue={"This the value"}
				isValid={false}
				isErrored={false}
				errorMessage="Change me via errorMessage prop"
			/>
			<Input
				placeholder="Placeholder"
				label="Valid"
				defaultValue="I'm valid because isValid is true"
				isValid={true}
				isErrored={false}
				errorMessage="Change me via errorMessage prop"
			/>
			<Input
				placeholder="Placeholder"
				label="Errored"
				defaultValue="I'm errored because isErrored is true"
				isValid={false}
				isErrored={true}
				errorMessage="Change me via errorMessage prop"
			/>
		</div>
	);
};
