import type { JSX } from "react";

export type UseFormFieldOptions<T = string | undefined> = {
	label: string;
	placeholder: string;
	defaultValue?: T;
	errorMessage: string;
	disabled?: boolean;
	validator: (value: T) => Promise<boolean> | boolean;
	className?: string;
};
export type UseFormFieldReturnValue<T = string | undefined> = [
	component: JSX.Element,
	value: T,
	isValid: boolean,
	reset: (shouldSetDefaultValue?: boolean) => void,
];

// biome-ignore lint/complexity/noBannedTypes: I want to be free to use `{}`
export type UseFormField<T = string | undefined, U = {}> = (
	options: UseFormFieldOptions<T> & U,
) => UseFormFieldReturnValue<T>;
