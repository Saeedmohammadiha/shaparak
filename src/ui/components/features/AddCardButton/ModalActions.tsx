import { Grid } from '@mui/material';
import { useRegister } from 'business/hooks/api-calls/register/useRegister';
import { useLoadingHandler } from 'business/stores/shaparak/loadingStore';
import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import ButtonAdapter from 'ui/htsc-components/ButtonAdapter';

type Props = {
	open: boolean;
	clearAlerts: () => void;
	setOpen: Dispatch<SetStateAction<boolean>>;
};

export default function ModalActions({ setOpen, clearAlerts }: Props) {
	const { t } = useTranslation();
	const { isLoading, mutate } = useRegister();
	useLoadingHandler(isLoading);

	const closeModal = () => {
		setOpen(false);
		clearAlerts();
	};

	const handleAddCard = () => {
		mutate(undefined, {
			onSuccess: closeModal,
			onError: closeModal
		});
	};

	return (
		<Grid
			container
			direction={'column'}
			justifyContent={'center'}
			gap={16}
		>
			<ButtonAdapter
				onClick={handleAddCard}
				variant={'contained'}
			>
				{t('registerCard')}
			</ButtonAdapter>
			<ButtonAdapter
				onClick={closeModal}
				variant={'outlined'}
			>
				{t('refuse')}
			</ButtonAdapter>
		</Grid>
	);
}
