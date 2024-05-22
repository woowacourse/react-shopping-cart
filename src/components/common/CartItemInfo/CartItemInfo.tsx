import { CartItem } from '@appTypes/shoppingCart';
import { formatKoreanCurrency } from '@utils/currency';

import * as Styled from './CartItemInfo.styled';

const Info = (): JSX.Element => {
  return <></>;
};

const CartItemName = ({ cartItem }: { cartItem: CartItem }) => {
  return <Styled.ItemName>{cartItem.product.name}</Styled.ItemName>;
};

const CartItemPrice = ({ cartItem }: { cartItem: CartItem }) => {
  return <Styled.ItemPrice>{formatKoreanCurrency(cartItem.product.price)}</Styled.ItemPrice>;
};

const CartItemImg = ({ cartItem }: { cartItem: CartItem }) => {
  return <Styled.ItemImage src={cartItem.product.imageUrl} />;
};

const CartItemInfo = Object.assign(Info, {
  Name: CartItemName,
  Price: CartItemPrice,
  Img: CartItemImg,
});

export default CartItemInfo;
