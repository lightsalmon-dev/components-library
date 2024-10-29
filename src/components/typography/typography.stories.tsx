import type { Story } from "@ladle/react";
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
import styles from "./typography.stories.module.scss";

export const Headings: Story = () => {
	return (
		<>
			<H1 className={styles.heading}>Heading 1</H1>
			<H2 className={styles.heading}>Heading 2</H2>
			<H3 className={styles.heading}>Heading 3</H3>
			<H4 className={styles.heading}>Heading 4</H4>
			<H5 className={styles.heading}>Heading 5</H5>
			<H6 className={styles.heading}>Heading 6</H6>
		</>
	);
};

export const Texts: Story = () => {
	return (
		<>
			<P className={styles.text}>Paragraph</P>
			<Strong className={styles.text}>Strong</Strong>
			<B className={styles.text}>Bold ({"<B>"})</B>
			<I className={styles.text}>Italic ({"<I>"})</I>
			<Small className={styles.text}>Small</Small>
			<Smallest className={styles.text}>Smallest</Smallest>
			<Em className={styles.text}>Emphasis ({"<Em>"})</Em>
			<A className={styles.text}>Link ({"<A>"})</A>
		</>
	);
};
