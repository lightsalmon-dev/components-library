import type { FC } from "react";

export type FormField = FC<{
	className?: string;
	label: string;
	placeholder: string;
	defaultValue?: string;
	errorMessage: string;
	disabled?: boolean;
	// biome-ignore lint/suspicious/noExplicitAny: It's fine to use any here, using generics would be overkill imo
	validator: (value: any) => Promise<boolean> | boolean;
}>;
