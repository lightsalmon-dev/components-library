import cn from "classnames";
import { type ComponentProps, forwardRef } from "react";

export const Grid = forwardRef<HTMLDivElement, ComponentProps<"div">>(
	({ className, ...otherProps }, ref) => {
		return (
			<div ref={ref} className={cn("ls-grid", className)} {...otherProps} />
		);
	},
);
