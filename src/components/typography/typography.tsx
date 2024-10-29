import cn from "classnames";
import { type ComponentProps, forwardRef } from "react";

export const H1 = forwardRef<HTMLHeadingElement, ComponentProps<"h1">>(
	({ className, ...otherProps }, ref) => {
		return <h1 ref={ref} className={cn("ls-h1", className)} {...otherProps} />;
	},
);

export const H2 = forwardRef<HTMLHeadingElement, ComponentProps<"h2">>(
	({ className, ...otherProps }, ref) => {
		return <h2 ref={ref} className={cn("ls-h2", className)} {...otherProps} />;
	},
);

export const H3 = forwardRef<HTMLHeadingElement, ComponentProps<"h3">>(
	({ className, ...otherProps }, ref) => {
		return <h3 ref={ref} className={cn("ls-h3", className)} {...otherProps} />;
	},
);

export const H4 = forwardRef<HTMLHeadingElement, ComponentProps<"h4">>(
	({ className, ...otherProps }, ref) => {
		return <h4 ref={ref} className={cn("ls-h4", className)} {...otherProps} />;
	},
);

export const H5 = forwardRef<HTMLHeadingElement, ComponentProps<"h5">>(
	({ className, ...otherProps }, ref) => {
		return <h5 ref={ref} className={cn("ls-h5", className)} {...otherProps} />;
	},
);

export const H6 = forwardRef<HTMLHeadingElement, ComponentProps<"h6">>(
	({ className, ...otherProps }, ref) => {
		return <h6 ref={ref} className={cn("ls-h6", className)} {...otherProps} />;
	},
);

export const P = forwardRef<HTMLParagraphElement, ComponentProps<"p">>(
	({ className, ...otherProps }, ref) => {
		return <p ref={ref} className={cn("ls-p", className)} {...otherProps} />;
	},
);

export const Strong = forwardRef<HTMLSpanElement, ComponentProps<"strong">>(
	({ className, ...otherProps }, ref) => {
		return (
			<strong
				ref={ref}
				className={cn("ls-strong", className)}
				{...otherProps}
			/>
		);
	},
);

export const B = forwardRef<HTMLSpanElement, ComponentProps<"b">>(
	({ className, ...otherProps }, ref) => {
		return <b ref={ref} className={cn("ls-b", className)} {...otherProps} />;
	},
);

export const I = forwardRef<HTMLSpanElement, ComponentProps<"i">>(
	({ className, ...otherProps }, ref) => {
		return <i ref={ref} className={cn("ls-i", className)} {...otherProps} />;
	},
);

export const Small = forwardRef<HTMLSpanElement, ComponentProps<"span">>(
	({ className, ...otherProps }, ref) => {
		return (
			<span ref={ref} className={cn("ls-small", className)} {...otherProps} />
		);
	},
);

export const Smallest = forwardRef<HTMLSpanElement, ComponentProps<"span">>(
	({ className, ...otherProps }, ref) => {
		return (
			<span
				ref={ref}
				className={cn("ls-smallest", className)}
				{...otherProps}
			/>
		);
	},
);

export const Em = forwardRef<HTMLSpanElement, ComponentProps<"span">>(
	({ className, ...otherProps }, ref) => {
		return <em ref={ref} className={cn("ls-em", className)} {...otherProps} />;
	},
);

export const A = forwardRef<HTMLAnchorElement, ComponentProps<"a">>(
	({ className, ...otherProps }, ref) => {
		return <a ref={ref} className={cn("ls-a", className)} {...otherProps} />;
	},
);
