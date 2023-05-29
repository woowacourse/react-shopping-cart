import { CartItem as CartItemType } from '@customTypes/Product';
import { useCartItems } from './useCartItems';

import {
  StyledCartList,
  StyledEmpty,
} from '@components/pages/CartPage/CartListSection/CartList/CartList.styled';
import ErrorModal from '@pages/ErrorPage/ErrorModal/ErrorModal';
import CartItem from './CartItem/CartItem';
import { SquareImage } from '@components/commons/SquareImage/SquareImage';
import { Paragraph } from '@components/commons/Text/Text';

const CartList = () => {
  const { cartItems, isGetCartItemsError } = useCartItems();

  return (
    <>
      <ErrorModal isError={isGetCartItemsError} />
      {cartItems.length ? (
        <StyledCartList>
          {cartItems.map((item: CartItemType) => {
            return <CartItem key={item.id} item={item} />;
          })}
        </StyledCartList>
      ) : (
        <StyledEmpty>
          <SquareImage
            size="xl"
            src={process.env.PUBLIC_URL + '/lay-down.png'}
          />
          <Paragraph>장바구니가 비었어요</Paragraph>
        </StyledEmpty>
      )}
    </>
  );
};

export default CartList;
