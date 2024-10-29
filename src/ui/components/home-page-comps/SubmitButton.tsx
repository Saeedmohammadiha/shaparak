import { Typography } from '@mui/material';
import { InquiryDestinationCommand } from 'business/application/shaparak/inquiry-destination-holder/command';
import { useInquiry } from 'business/hooks/api-calls/inquiry-destination/useInquiry';
import { useLoadingHandler } from 'business/stores/shaparak/loadingStore';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import ButtonAdapter from 'ui/htsc-components/ButtonAdapter';

export default function SubmitButton() {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const { handleSubmit } = useFormContext<InquiryDestinationCommand>();
	const { mutate, isLoading } = useInquiry();
	useLoadingHandler(isLoading);

	const submit = (data: InquiryDestinationCommand) => {
		mutate(data);
		// we need data in the next page
	};

	return (
		<ButtonAdapter
			onClick={handleSubmit(submit)}
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
