import { createBrowserRouter } from 'react-router-dom';

import ErrorPage from 'ui/pages/ErrorPage';
import Home from 'ui/pages/Home';
import Layout from '../pages/Layout';
import { paths } from './paths';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		errorElement: <ErrorPage />,
		children: [{ index: true, path: paths.Home, element: <Home /> }]
	}
]);

export default router;
