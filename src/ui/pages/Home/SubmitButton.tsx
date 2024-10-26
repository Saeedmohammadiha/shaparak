import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ButtonAdapter from 'ui/htsc-components/ButtonAdapter';

export default function SubmitButton() {
	const { t } = useTranslation();

	const submitHandler = () => {
		//todo
	};

	return (
		<ButtonAdapter
			onClick={submitHandler}
			variant="contained"
			muiButtonProps={{ sx: { width: '100%' } }}
		>
			<Typography
				variant="bodyMd"
				fontWeight={'medium'}
			>
				{t('continue')}
			</Typography>
		</ButtonAdapter>
	);
}
