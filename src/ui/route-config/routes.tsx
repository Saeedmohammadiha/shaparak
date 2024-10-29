import { createBrowserRouter } from 'react-router-dom';

import PageLayout from 'ui/components/layout/PageLayout';
import ErrorPage from 'ui/pages/ErrorPage';
import Home from 'ui/pages/Home';
import Overview from 'ui/pages/Overview';
import Layout from '../pages/Layout';
import { paths } from './paths';

const router = createBrowserRouter(
	[
		{
			path: '/',
			element: <Layout />,
			errorElement: <ErrorPage />,
			children: [
				{
					path: paths.layout,
					element: <PageLayout />,
					children: [
						{ index: true, path: paths.Home, element: <Home /> },
						{ path: paths.Overview, element: <Overview /> }
					]
				}
			]
		}
	],
	{
		basename: import.meta.env.BASE_URL
	}
);

export default router;
