import { type FieldValues } from 'react-hook-form';
import { Controlled, FormControlProps } from 'ui/htsc-components/ControlledInput/Controlled';
import SelectAdapter from 'ui/htsc-components/SelectAdapter';
import type { Props as SelectAdapterProps } from 'ui/htsc-components/SelectAdapter/type';

export type Props<TFieldValues extends FieldValues, TContext> = FormControlProps<TFieldValues, TContext> &
	SelectAdapterProps;

export function ControlledSelect<TFieldValues extends FieldValues, TContext>(props: Props<TFieldValues, TContext>) {
	return (
		<Controlled<SelectAdapterProps, TFieldValues, TContext>
			element={(props) => {
				return <SelectAdapter {...props} />;
			}}
			{...props}
		/>
	);
}
