import { CartItem } from '@appTypes/shoppingCart';
import { formatKoreanCurrency } from '@utils/currency';
import { ReactNode } from 'react';

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
  return <Styled.ItemImage src={cartItem.product.imageUrl} alt={`${cartItem.product.name} 이미지`} />;
};

const CartItemQuantity = ({ cartItem }: { cartItem: CartItem }) => {
  return <Styled.ItemQuantity>{cartItem.quantity}개</Styled.ItemQuantity>;
};

const CartItemDescription = ({ children }: { children: ReactNode }) => {
  return <Styled.Description>{children}</Styled.Description>;
};

const CartItemDetailContainer = ({ children }: { children: ReactNode }) => {
  return <Styled.DetailContainer>{children}</Styled.DetailContainer>;
};

const CartItemInfo = Object.assign(Info, {
  Name: CartItemName,
  Price: CartItemPrice,
  Img: CartItemImg,
  Quantity: CartItemQuantity,
  Description: CartItemDescription,
  DetailContainer: CartItemDetailContainer,
});

export default CartItemInfo;
