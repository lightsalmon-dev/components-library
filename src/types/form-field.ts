import type { FC } from "react";

export type FormField<T = string | undefined> = FC<{
	className?: string;
	label: string;
	placeholder: string;
	defaultValue?: string;
	errorMessage: string;
	disabled?: boolean;
	onChange?: (value: T) => void;
	validator: (value: T) => Promise<boolean> | boolean;
}>;
