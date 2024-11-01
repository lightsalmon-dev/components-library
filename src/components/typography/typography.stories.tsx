import type { Story } from "@ladle/react";
import { StoryContainer } from "../../../.ladle/components";
import {
	A,
	B,
	Em,
	H1,
	H2,
	H3,
	H4,
	H5,
	H6,
	I,
	P,
	Small,
	Smallest,
	Strong,
} from "./typography";

export const Headings: Story = () => {
	return (
		<StoryContainer>
			<H1>Heading 1</H1>
			<H2>Heading 2</H2>
			<H3>Heading 3</H3>
			<H4>Heading 4</H4>
			<H5>Heading 5</H5>
			<H6>Heading 6</H6>
		</StoryContainer>
	);
};

export const Texts: Story = () => {
	return (
		<StoryContainer>
			<P>Paragraph</P>
			<Strong>Strong</Strong>
			<B>Bold ({"<B>"})</B>
			<I>Italic ({"<I>"})</I>
			<Small>Small</Small>
			<Smallest>Smallest</Smallest>
			<Em>Emphasis ({"<Em>"})</Em>
			<A>Link ({"<A>"})</A>
		</StoryContainer>
	);
};
