import Header from '../../components/layout/header/Header';
import CartPage from '../cartPage/CartPage';
import * as S from './Layout.styles';

const Layout = () => {
  return (
    <div css={S.LayoutWrapper}>
      <Header />
      <CartPage />
    </div>
  );
};

export default Layout;
