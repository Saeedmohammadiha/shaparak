import { MenuItem } from '@mui/material';
import { useGetCardsList } from 'business/hooks/api-calls/get-cards-list/useGetCardsList';
import { LoadingContext } from 'business/stores/shaparak/loadingContext';
import { useContext, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ControlledSelect } from 'ui/htsc-components/ControlledInput/ControlledSelect';

export default function OriginCardsSelect() {
	const { t } = useTranslation();
	const { control } = useFormContext();
	const { data, isLoading } = useGetCardsList();
	const { setLoading } = useContext(LoadingContext);

	useEffect(() => {
		setLoading(isLoading);
	}, [isLoading]);

	//TODO: get the list of cards and render inside the select
	return (
		<ControlledSelect
			control={control}
			name="origin"
			label={t('originCardNumber')}
			onChange={() => {}}
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
