import { useRecoilValue } from 'recoil';
import CartItem from './CartItem/CartItem';
import cartState, { totalPriceSelector } from '../../../recoil/cartState';
import CartAllCheckbox from './CartAllCheckbox/CartAllCheckbox';
import DeleteSelectedButton from './DeleteSelectedButton/DeleteSelectedButton';
import CartList from './CartList/CartList';

const CartPage = () => {
  return (
    <>
      <CartList />
      <p>야호</p>
    </>
  );
};

export default CartPage;
