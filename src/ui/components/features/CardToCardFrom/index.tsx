import validator from '@Fluentvalidator/extentions/fluentValidationResolver';
import { Grid } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ControlledInput } from 'ui/htsc-components/ControlledInput/ControlledInput';
import { ControlledTextArea } from 'ui/htsc-components/ControlledInput/ControlledTextArea';
import DestinationCardSelect from './DestinationCardSelect';
import OriginCardsSelect from './OriginCardsSelect';

export default function CardToCardFrom() {
	const { t } = useTranslation();

	// const methods = useForm<CheckInfoFormValidatorCommand>({
	// 	resolver: (values, context, options) => {
	// 		return validator(values, context, options);
	// 	},
	// 	context: CheckInfoFormValidatorCommand
	// });

	const methods = useForm({
		resolver: (values, context, options) => {
			return validator(values, context, options);
		}
	});

	return (
		<FormProvider {...methods}>
			<Grid
				container
				direction={'column'}
				gap={16}
			>
				<OriginCardsSelect />
				<DestinationCardSelect />

				<ControlledInput
					control={methods.control}
					name="amount"
					label={t('amount', { tail: t('rial') })}
					type="number"
					onChange={() => {}}
				/>
				<ControlledTextArea
					control={methods.control}
					name="description"
					onChange={() => {}}
					label={t('description', { tail: t('optional') })}
				/>
			</Grid>
		</FormProvider>
	);
}
