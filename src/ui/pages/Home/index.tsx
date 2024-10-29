import validator from '@Fluentvalidator/extentions/fluentValidationResolver';
import { Grid } from '@mui/material';
import { InquiryDestinationCommand } from 'business/application/shaparak/inquiry-destination-holder/command';
import { FormProvider, useForm } from 'react-hook-form';
import AddCardButton from 'ui/components/features/AddCardButton';
import CardToCardFrom from 'ui/components/features/CardToCardFrom';
import SubmitButton from '../../components/home-page-comps/SubmitButton';

export default function Home() {
	const methods = useForm<InquiryDestinationCommand>({
		resolver: (values, context, options) => {
			return validator(values, context, options);
		},
		context: InquiryDestinationCommand
	});

	return (
		<FormProvider {...methods}>
			<Grid
				marginTop={50}
				container
				direction={'column'}
				gap={16}
			>
				<AddCardButton />
				<CardToCardFrom />
			</Grid>
			<SubmitButton />
		</FormProvider>
	);
}
