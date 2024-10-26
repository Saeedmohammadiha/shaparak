import { Grid, useTheme } from '@mui/material';
import { LoadingContext } from 'business/stores/shaparak/loadingContext';
import { ReactNode, useContext } from 'react';
import BoxAdapter from 'ui/htsc-components/BoxAdapter';
import Loader from 'ui/htsc-components/loader/Loader';
import Stepper from 'ui/htsc-components/Stepper';
import { StepperProps } from 'ui/htsc-components/Stepper/types';

type Props = {
	children: ReactNode;
	actions?: ReactNode | ReactNode[];
	sidebar?: ReactNode;
	stepperProps?: StepperProps;
};
export default function PageLayout(props: Props) {
	const { children, actions, sidebar, stepperProps } = props;
	const theme = useTheme();
	const { isLoading } = useContext(LoadingContext);

	return (
		<Grid
			container
			sx={{ padding: { md: '32px 8px', xs: '0' } }}
			justifyContent={'center'}
			gap={'24px'}
			dir={theme.direction}
		>
			<Grid
				item
				xs={12}
				md={sidebar ? 8 : 12}
			>
				<BoxAdapter fullWidthBreakpoint={'md'}>
					<Grid
						sx={{
							minHeight: { md: 'calc(100% - 64px)', xs: 'calc(100vh - 32px)' },
							padding: { md: '16px', xs: '0' }
						}}
						container
						direction={'column'}
						justifyContent={'space-between'}
						wrap="nowrap"
					>
						<Grid
							container
							direction={'column'}
						>
							{stepperProps ? <Stepper {...stepperProps} /> : null}

							{children}
						</Grid>

						{actions ? (
							<Grid
								container
								justifyContent={'space-between'}
								//sx={{ marginTop: '16px' }}
							>
								{actions}
							</Grid>
						) : null}
					</Grid>
				</BoxAdapter>
			</Grid>

			{sidebar ? (
				<Grid
					item
					md={3}
					dir={theme.direction}
					sx={{
						display: {
							sm: theme.breakpoints.down('md')
						}
					}}
				>
					{sidebar}
				</Grid>
			) : null}
			<Loader showLoader={isLoading} />
		</Grid>
	);
}
