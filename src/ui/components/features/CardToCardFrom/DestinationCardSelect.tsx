import { MenuItem } from '@mui/material';
import { useGetDestinationCards } from 'business/hooks/api-calls/get-destination-cards/useGetDestinationCards';
import { LoadingContext } from 'business/stores/shaparak/loadingContext';
import { useContext, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ControlledSelect } from 'ui/htsc-components/ControlledInput/ControlledSelect';

export default function DestinationCardSelect() {
	const { t } = useTranslation();
	const { control } = useFormContext();
	const { setLoading } = useContext(LoadingContext);
	const { data, isLoading } = useGetDestinationCards();

	useEffect(() => {
		setLoading(isLoading);
	}, [isLoading]);

	//TODO: // call the dadehaye por karbord and show to user

	return (
		<ControlledSelect
			control={control}
			name="destination"
			label={t('destinationCardNumber')}
			onChange={() => {}}
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
