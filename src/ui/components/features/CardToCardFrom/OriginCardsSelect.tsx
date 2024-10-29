import { MenuItem } from '@mui/material';
import { useGetCardsList } from 'business/hooks/api-calls/get-cards-list/useGetCardsList';
import { useLoadingHandler } from 'business/stores/shaparak/loadingStore';
import { InquiryDestinationCommand } from 'main';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ControlledSelect } from 'ui/htsc-components/ControlledInput/ControlledSelect';

export default function OriginCardsSelect() {
	const { t } = useTranslation();
	const { control, formState } = useFormContext<InquiryDestinationCommand>();
	const { data, isLoading } = useGetCardsList();
	useLoadingHandler(isLoading);

	//TODO: get the list of cards and render inside the select
	return (
		<ControlledSelect
			control={control}
			name="cardIndex"
			label={t('originCardNumber')}
			onChange={() => {}}
			error={!!formState.errors.cardIndex?.message}
			helperText={formState.errors.cardIndex?.message}
		>
			{data?.map((card) => {
				return (
					<MenuItem
						key={card.cardIndex}
						value={card.cardIndex}
					>
						{card.maskedPan}
					</MenuItem>
				);
			})}
		</ControlledSelect>
	);
}
