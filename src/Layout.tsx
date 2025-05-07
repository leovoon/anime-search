import { Outlet, ScrollRestoration } from 'react-router-dom';

const Layout = () => (
    <>
      <ScrollRestoration />
      <Outlet />
    </>
  );
  
export default Layout;
