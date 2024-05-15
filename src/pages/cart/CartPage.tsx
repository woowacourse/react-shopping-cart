import Header from '../../components/Header/Header';
import Button from '../../components/common/Button';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../constants/routes';
import { productsState } from '../../store/selectors';
import { useRecoilValue } from 'recoil';
import CartList from './components/CartList';
import CartTitle from './components/CartTitle';
import CartTotals from './components/CartTotals';

import styles from './Cart.module.css';

export default function CartPage() {
  const navigate = useNavigate();
  const handleHomeButtonClick = () => {
    navigate(ROUTES.CART);
  };

  const products = useRecoilValue(productsState);

  return (
    <>
      <Header>
        <Button variant="header" onClick={handleHomeButtonClick}>
          SHOP
        </Button>
      </Header>
      <div className={styles.cartBodyWrapper}>
        <CartTitle productsCount={products.length} />
        <CartList products={products} />
        <CartTotals />
      </div>
      <Button variant="footer" disabled={!products.length}>
        주문 하기
      </Button>
    </>
  );
}
