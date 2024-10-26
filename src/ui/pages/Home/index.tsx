import { Grid } from '@mui/material';
import LoadingProvider from 'business/stores/shaparak/loadingContext';
import { useTranslation } from 'react-i18next';
import AddCardButton from 'ui/components/features/AddCardButton';
import CardToCardFrom from 'ui/components/features/CardToCardFrom';
import PageLayout from 'ui/components/layout/PageLayout';
import SubmitButton from './SubmitButton';

export default function Home() {
	const { t } = useTranslation();

	return (
		<LoadingProvider>
			<PageLayout
				stepperProps={{
					list: [t('cardInformation'), t('paymentInformation'), t('transactionReceipt')],
					active: 0
				}}
				actions={<SubmitButton />}
			>
				<Grid
					container
					direction={'column'}
					gap={16}
				>
					<AddCardButton />
					<CardToCardFrom />
				</Grid>
			</PageLayout>
		</LoadingProvider>
	);
}
