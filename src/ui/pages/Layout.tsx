import { useInitConfig } from 'business/hooks/init-config/useInitConfig';
import { Outlet } from 'react-router-dom';
import AppAlerts from 'ui/htsc-components/alerts/AppAlerts';
import Loader from 'ui/htsc-components/loader/Loader';
import MaterialThemeProvider from 'ui/htsc-components/MaterialThemeProvider';

const Layout = () => {
	const isReady = useInitConfig();

	return isReady ? (
		<MaterialThemeProvider>
			<>
				<AppAlerts />
				<Outlet />
			</>
		</MaterialThemeProvider>
	) : (
		<Loader showLoader></Loader>
	);
};

export default Layout;
