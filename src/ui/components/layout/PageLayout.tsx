import { Grid, useTheme } from '@mui/material';
import { useLoading } from 'business/stores/shaparak/loadingStore';
import { Outlet } from 'react-router-dom';
import BoxAdapter from 'ui/htsc-components/BoxAdapter';
import Loader from 'ui/htsc-components/loader/Loader';

export default function PageLayout() {
	const theme = useTheme();

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
						<Outlet />
					</Grid>
				</BoxAdapter>
			</Grid>

			<LoaderSwitch />
		</Grid>
	);
}

export function LoaderSwitch() {
	const loading = useLoading((state) => state.loading);
	return <Loader showLoader={loading} />;
}
