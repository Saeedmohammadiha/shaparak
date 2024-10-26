import { type FieldValues } from 'react-hook-form';
import { Controlled, FormControlProps } from 'ui/htsc-components/ControlledInput/Controlled';
import InputAdapter from 'ui/htsc-components/InputAdapter';
import { InputAdapterProps } from 'ui/htsc-components/InputAdapter/type';

export type Props<TFieldValues extends FieldValues, TContext> = FormControlProps<TFieldValues, TContext> &
	InputAdapterProps;

export function ControlledInput<TFieldValues extends FieldValues, TContext>(props: Props<TFieldValues, TContext>) {
	return (
		<Controlled<InputAdapterProps, TFieldValues, TContext>
			element={(props) => {
				return <InputAdapter {...props} />;
			}}
			{...props}
		/>
	);
}
