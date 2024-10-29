import { Grid } from '@mui/material';
import { InquiryDestinationCommand } from 'main';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ControlledInput } from 'ui/htsc-components/ControlledInput/ControlledInput';
import { ControlledTextArea } from 'ui/htsc-components/ControlledInput/ControlledTextArea';
import DestinationCardSelect from './DestinationCardSelect';
import OriginCardsSelect from './OriginCardsSelect';

export default function CardToCardFrom() {
	const { t } = useTranslation();
	const { control, formState } = useFormContext<InquiryDestinationCommand>();

	return (
		<Grid
			container
			direction={'column'}
			gap={16}
		>
			<OriginCardsSelect />
			<DestinationCardSelect />

			<ControlledInput
				control={control}
				name="amount"
				label={t('amount', { tail: t('rial') })}
				type="money"
				onChange={() => {}}
				error={!!formState.errors.amount?.message}
				helperText={formState.errors.amount?.message}
			/>
			<ControlledTextArea
				control={control}
				name="description"
				onChange={() => {}}
				label={t('description', { tail: t('optional') })}
				error={!!formState.errors.description?.message}
				helperText={formState.errors.description?.message}
			/>
		</Grid>
	);
}
