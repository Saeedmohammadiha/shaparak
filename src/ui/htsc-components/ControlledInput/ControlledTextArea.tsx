import { type FieldValues } from 'react-hook-form';
import { Controlled, FormControlProps } from 'ui/htsc-components/ControlledInput/Controlled';
import TextAreaAdapater from 'ui/htsc-components/TextareaAdapter';
import { TextareaAdapterProps } from 'ui/htsc-components/TextareaAdapter/type';

export type Props<TFieldValues extends FieldValues, TContext> = FormControlProps<TFieldValues, TContext> &
	TextareaAdapterProps;

export function ControlledTextArea<TFieldValues extends FieldValues, TContext>(props: Props<TFieldValues, TContext>) {
	return (
		<Controlled<TextareaAdapterProps, TFieldValues, TContext>
			element={(props) => {
				return <TextAreaAdapater {...props} />;
			}}
			{...props}
		/>
	);
}
