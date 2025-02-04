import React from 'react';
import { Controller, ControllerRenderProps, FieldPath, type Control, type FieldValues } from 'react-hook-form';

export type FormControlProps<TFieldValues extends FieldValues, TContext> = {
	control: Control<TFieldValues, TContext>;
	name: FieldPath<TFieldValues>;
};

export type Props<
	TElementProps extends { onChange?: (value: string) => void },
	TFieldValues extends FieldValues,
	TContext
> = {
	element: (props: TElementProps) => React.ReactElement<TElementProps>;
} & FormControlProps<TFieldValues, TContext> &
	TElementProps;

export function Controlled<
	TElementProps extends { onChange?: (value: string) => void },
	TFieldValues extends FieldValues,
	TContext
>({ name, control, element, onChange, ...restProps }: Props<TElementProps, TFieldValues, TContext>) {
	const callBack = (value: string, field: ControllerRenderProps<TFieldValues, typeof name>) => {
		field.onChange(value);
		onChange?.(value);
	};

	return (
		<Controller
			control={control}
			name={name}
			render={({ field }) => {
				return element({
					onChange: (value: string) => callBack(value, field),
					defaultValue: field.value,
					...restProps
				} as unknown as TElementProps);
			}}
		/>
	);
}
