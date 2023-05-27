import { CartItem as CartItemType } from '@customTypes/Product';
import { useCartItems } from './useCartItems';

import { StyledCartList } from '@components/pages/CartPage/CartListSection/CartList/CartList.styled';
import ErrorModal from '@pages/ErrorPage/ErrorModal/ErrorModal';
import CartItem from './CartItem/CartItem';

const CartList = () => {
  const { cartItems, isGetCartItemsError } = useCartItems();

  return (
    <>
      <ErrorModal isError={isGetCartItemsError} />
      <StyledCartList>
        {cartItems.map((item: CartItemType) => {
          return <CartItem key={item.id} item={item} />;
        })}
      </StyledCartList>
    </>
  );
};

export default CartList;
