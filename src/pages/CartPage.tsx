import CartList from '../components/cart/CartList';
import useNavigatePage from '../hooks/useNavigatePage';
import { CartListWrapper } from '../style/ContentLayout';
import Header from '../components/@common/Header';

const CartPage = () => {
  const { goHome } = useNavigatePage();
  return (
    <>
      <Header title="STORE" onClickTitle={goHome} />
      <CartListWrapper>
        <CartList />
      </CartListWrapper>
    </>
  );
};

export default CartPage;
