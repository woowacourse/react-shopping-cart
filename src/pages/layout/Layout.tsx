import ToastProvider from '../../contexts/ToastContext';
import * as S from './Layout.styles';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <ToastProvider>
      <div css={S.LayoutWrapper}>
        <Outlet />
      </div>
    </ToastProvider>
  );
};

export default Layout;
