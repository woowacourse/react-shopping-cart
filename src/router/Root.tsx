import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
import Layout from '../components/@common/Layout/Layout';

const Root = () => {
  return (
    <>
      <Header />
      <Layout>
        <Outlet />
      </Layout>
    </>
  );
};

export default Root;
