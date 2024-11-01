import type { ComponentProps, FC } from "react";
import cn from "../../utils/cn";

export const IconChevronLeft: FC<ComponentProps<"svg">> = ({
	className,
	...otherProps
}) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth="1.5"
			stroke="currentColor"
			className={cn("ls-icon", className)}
			{...otherProps}
		>
			<title>Chevron Left</title>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M15.75 19.5 8.25 12l7.5-7.5"
			/>
		</svg>
	);
};
