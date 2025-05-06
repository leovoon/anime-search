import { createBrowserRouter } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import DetailPage from './pages/DetailPage';

// Create router with standard configuration
const router = createBrowserRouter([
  {
    path: '/',
    element: <SearchPage />,
    
  },
  {
    path: '/anime/:id',
    element: <DetailPage />,
  },
]);

export default router;
