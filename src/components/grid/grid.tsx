import { type ComponentProps, forwardRef } from "react";
import cn from "../../utils/cn";

export const Grid = forwardRef<HTMLDivElement, ComponentProps<"div">>(
	({ className, ...otherProps }, ref) => {
		return (
			<div ref={ref} className={cn("ls-grid", className)} {...otherProps} />
		);
	},
);
