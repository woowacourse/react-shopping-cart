import Header from '../components/common/Header';
import CartList from '../components/cart/CartList';
import useNavigatePage from '../hooks/useNavigatePage';

const CartPage = () => {
  const { goHome } = useNavigatePage();
  return (
    <>
      <Header title="STORE" onClickTitle={goHome} />
      <CartList />
    </>
  );
};

export default CartPage;
