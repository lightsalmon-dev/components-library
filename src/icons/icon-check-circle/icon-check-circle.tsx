import type { ComponentProps, FC } from "react";
import cn from "../../utils/cn";

export const IconCheckCircle: FC<ComponentProps<"svg">> = ({
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
			<title>Check circle</title>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
			/>
		</svg>
	);
};
