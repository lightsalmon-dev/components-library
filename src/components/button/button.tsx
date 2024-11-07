import { type ComponentProps, forwardRef } from "react";
import cn from "../../utils/cn";

type ButtonProps = ComponentProps<"button"> & {
	variant?: "primary" | "secondary" | "tertiary" | "warning" | "danger";
};
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ variant = "primary", className, disabled, ...otherProps }, ref) => {
		return (
			<button
				ref={ref}
				disabled={disabled}
				className={cn(
					"ls-button",
					{
						"ls-button-primary": variant === "primary" && !disabled,
						"ls-button-secondary": variant === "secondary" && !disabled,
						"ls-button-tertiary": variant === "tertiary" && !disabled,
						"ls-button-warning": variant === "warning" && !disabled,
						"ls-button-danger": variant === "danger" && !disabled,
					},
					className,
				)}
				{...otherProps}
			/>
		);
	},
);
