import type { Story } from "@ladle/react";
import { StoryContainer } from "../../../.ladle/components";
import { Button } from "./button";

export const All: Story = () => {
	return (
		<StoryContainer>
			<Button disabled>Disabled</Button>
			<Button>Primary</Button>
			<Button variant="secondary">Secondary</Button>
			<Button variant="tertiary">Tertiary</Button>
			<Button variant="warning">Warning</Button>
			<Button variant="danger">Danger</Button>
		</StoryContainer>
	);
};
