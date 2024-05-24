import { Outlet } from 'react-router';
import Header from '../components/Header/Header';

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Layout;
