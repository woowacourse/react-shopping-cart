import Header from '../../components/Header/Header';
import Button from '../../components/common/Button';
import { useNavigate } from 'react-router-dom';
import { totalOrderAmountState, totalProductQuantity } from '../../store/selectors';
import { useRecoilValue } from 'recoil';
import CartList from './components/CartList';
import CartTitle from './components/CartTitle';
import CartTotals from './components/CartTotals';
import ROUTES from '../../constants/routes';

import styles from './Cart.module.css';
import { productsState } from '../../store/atoms';

export default function CartPage() {
  const navigate = useNavigate();
  const handleHomeButtonClick = () => {
    navigate(ROUTES.CART);
  };
  const products = useRecoilValue(productsState);
  const { totalCount, totalQuantity } = useRecoilValue(totalProductQuantity);
  const { totalAmount } = useRecoilValue(totalOrderAmountState);

  const handleFooterButtonClick = () => {
    navigate(ROUTES.CHECK_OUT, {
      state: {
        totalCount,
        totalQuantity,
        totalAmount,
      },
    });
  };

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
      <Button onClick={handleFooterButtonClick} variant="footer" disabled={!products.length}>
        주문 하기
      </Button>
    </>
  );
}
