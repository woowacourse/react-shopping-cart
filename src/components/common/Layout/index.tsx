import { PropsWithChildren } from 'react';
import Header from '../Header';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
};

export default Layout;
