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
			/>
			<Input
				placeholder="Placeholder"
				label="Filled"
				defaultValue={"This the value"}
				isValid={false}
				isErrored={false}
			/>
			<Input
				placeholder="Placeholder"
				label="Valid"
				defaultValue={"This is a valid value"}
				isValid={true}
				isErrored={false}
			/>
			<Input
				placeholder="Placeholder"
				label="Errored"
				defaultValue={"This is an errored value"}
				isValid={false}
				isErrored={true}
			/>
		</div>
	);
};
