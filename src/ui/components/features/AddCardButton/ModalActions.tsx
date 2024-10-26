import { Grid } from '@mui/material';
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

	return (
		<Grid>
			<ButtonAdapter
				onClick={() => {
					setOpen(false);
					clearAlerts();
				}}
				variant={'contained'}
			>
				{t('registerCard')}
			</ButtonAdapter>
			<ButtonAdapter
				onClick={() => {
					setOpen(false);
					clearAlerts();
				}}
				variant={'outlined'}
			>
				{t('refuse')}
			</ButtonAdapter>
		</Grid>
	);
}
