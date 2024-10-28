import AddIcon from '@mui/icons-material/Add';
import { Grid, Typography, useTheme } from '@mui/material';
import { pushAlert } from 'business/stores/AppAlertsStore';
import { useTranslation } from 'react-i18next';
import ButtonAdapter from 'ui/htsc-components/ButtonAdapter';
import ModalActions from './ModalActions';
import ModalText from './ModalText';

export default function AddCardButton() {
	const { t } = useTranslation();
	const theme = useTheme();

	const handleAddCard = () => {
		pushAlert({
			type: 'info',
			messageText: <ModalText />,
			overrideActions: (props) => <ModalActions {...props} />
		});
	};

	return (
		<ButtonAdapter
			onClick={handleAddCard}
			variant="outlined"
			muiButtonProps={{
				sx: {
					backgroundColor: theme.palette.primary[50]
				}
			}}
		>
			<Grid
				container
				alignItems={'center'}
				justifyContent={'center'}
			>
				<AddIcon color="primary" />
				<Typography
					variant="bodySm"
					fontWeight={'medium'}
					color={theme.palette.primary[500]}
				>
					{t('addCardOtherBanks')}
				</Typography>
			</Grid>
		</ButtonAdapter>
	);
}
