import type { FC } from "react";

export type FormField = FC<{
	label: string;
	placeholder: string;
	defaultValue?: string;
	errorMessage: string;
	disabled?: boolean;
}>;
