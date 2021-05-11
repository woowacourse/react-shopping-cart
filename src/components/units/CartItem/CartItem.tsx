import React from 'react';
import Styled from './CartItem.styles';
import { ReactComponent as DeleteIcon } from '../../../assets/images/delete.svg';
import Checkbox from '../../shared/Checkbox/Checkbox';
import QuantityInput from '../../shared/QuantityInput/QuantityInput';
import NoImageURL from '../../../assets/images/no_image.jpg';
import * as T from '../../../types';

type CartItemProps = {
  product: T.Product;
  quantity: number;
  checked?: boolean;
};

const CartItem = (props: CartItemProps) => {
  const { product, quantity, checked } = props;
  const { name, image, price } = product;

  return (
    <Styled.Root>
      <Checkbox checked={checked} />
      <Styled.Image src={image || NoImageURL} alt="김말이" />
      <Styled.Title>{name}</Styled.Title>
      <Styled.Option>
        <Styled.Delete>
          <DeleteIcon />
        </Styled.Delete>
        <Styled.QuantityInputWrapper>
          <QuantityInput value={quantity} min={1} max={99} />
        </Styled.QuantityInputWrapper>
        <Styled.Price>{price.toLocaleString('ko-KR')} 원</Styled.Price>
      </Styled.Option>
    </Styled.Root>
  );
};

CartItem.defaultProps = {
  checked: false,
};

export default CartItem;
