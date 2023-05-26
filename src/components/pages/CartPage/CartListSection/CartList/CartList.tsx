import { useCartItems } from './useCartItems';

import { StyledCartList } from '@components/pages/CartPage/CartListSection/CartList/CartList.styled';
import ErrorModal from '@pages/ErrorPage/ErrorModal/ErrorModal';
import CartItem from './CartItem/CartItem';
import { CartItemApi } from '@customTypes/Product';

const CartList = () => {
  const { cartItems, isGetCartItemsError } = useCartItems();

  return (
    <>
      <ErrorModal isError={isGetCartItemsError} />
      <StyledCartList>
        {cartItems.map((item: CartItemApi) => {
          return (
            <CartItem
              key={item.id}
              id={item.id}
              quantity={item.quantity}
              product={item.product}
            />
          );
        })}
      </StyledCartList>
    </>
  );
};

export default CartList;
