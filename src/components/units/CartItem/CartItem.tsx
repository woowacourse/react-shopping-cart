import React from 'react';
import Styled from './CartItem.styles';
import { ReactComponent as DeleteIcon } from '../../../assets/images/delete.svg';
import Checkbox from '../../shared/Checkbox/Checkbox';
import QuantityInput from '../../shared/QuantityInput/QuantityInput';
import NoImageURL from '../../../assets/images/no_image.jpg';

type CartItemProps = {
  title: string;
  imageUrl?: string;
  price: number;
  checked?: boolean;
};

const CartItem = (props: CartItemProps) => {
  const { title, imageUrl, price, checked } = props;

  return (
    <Styled.CartItem>
      <Checkbox checked={checked} />
      <Styled.CartItemImage src={imageUrl} alt="김말이" />
      <Styled.CartItemTitle>{title}</Styled.CartItemTitle>
      <Styled.CartItemOption>
        <Styled.CartItemDelete>
          <DeleteIcon />
        </Styled.CartItemDelete>
        <Styled.QuantityInputWrapper>
          <QuantityInput value={1} min={1} max={99} />
        </Styled.QuantityInputWrapper>
        <Styled.CartItemPrice>{price.toLocaleString('ko-KR')} 원</Styled.CartItemPrice>
      </Styled.CartItemOption>
    </Styled.CartItem>
  );
};

CartItem.defaultProps = {
  imageUrl: NoImageURL,
  checked: false,
};

export default CartItem;
