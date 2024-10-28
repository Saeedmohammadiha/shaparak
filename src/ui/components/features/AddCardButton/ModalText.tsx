import { Typography, useTheme } from '@mui/material';
import { Trans, useTranslation } from 'react-i18next';

export default function ModalText() {
	const { t } = useTranslation();
	const theme = useTheme();

	return (
		<Typography
			variant="bodySm"
			sx={{ textAlign: 'center' }}
		>
			<Trans
				i18nKey={'addCardModalText'}
				values={{ coloredText: t('attention') }}
				components={{ span: <span style={{ color: theme.palette.primary.main }} />, dd: <dd /> }}
			/>
		</Typography>
	);
}
