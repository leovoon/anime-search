import { createBrowserRouter } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import DetailPage from './pages/DetailPage';
import Layout from './Layout';

// Create router with standard configuration
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <SearchPage /> },
      { path: '/anime/:id',element: <DetailPage /> },
    ],
  }
]);

export default router;
