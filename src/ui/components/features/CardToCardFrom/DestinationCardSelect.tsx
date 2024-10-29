import { MenuItem } from '@mui/material';
import { useGetDestinationCards } from 'business/hooks/api-calls/get-destination-cards/useGetDestinationCards';
import { useLoadingHandler } from 'business/stores/shaparak/loadingStore';
import { InquiryDestinationCommand } from 'main';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ControlledSelect } from 'ui/htsc-components/ControlledInput/ControlledSelect';

export default function DestinationCardSelect() {
	const { t } = useTranslation();
	const { control, formState } = useFormContext<InquiryDestinationCommand>();
	const { data, isLoading } = useGetDestinationCards();
	useLoadingHandler(isLoading);

	//TODO: // call the dadehaye por karbord and show to user

	return (
		<ControlledSelect
			control={control}
			name="destinationCardNo"
			label={t('destinationCardNumber')}
			onChange={() => {}}
			error={!!formState.errors.destinationCardNo?.message}
			helperText={formState.errors.destinationCardNo?.message}
		>
			{data?.datas.map((card) => {
				return (
					<MenuItem
						key={card.value}
						value={card.value}
					>
						{card.value}
						{card.title}
					</MenuItem>
				);
			})}
		</ControlledSelect>
	);
}
