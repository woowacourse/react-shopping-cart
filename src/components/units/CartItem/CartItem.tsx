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
    <Styled.Root>
      <Checkbox checked={checked} />
      <Styled.Image src={imageUrl} alt="김말이" />
      <Styled.Title>{title}</Styled.Title>
      <Styled.Option>
        <Styled.Delete>
          <DeleteIcon />
        </Styled.Delete>
        <Styled.QuantityInputWrapper>
          <QuantityInput value={1} min={1} max={99} />
        </Styled.QuantityInputWrapper>
        <Styled.Price>{price.toLocaleString('ko-KR')} 원</Styled.Price>
      </Styled.Option>
    </Styled.Root>
  );
};

CartItem.defaultProps = {
  imageUrl: NoImageURL,
  checked: false,
};

export default CartItem;
