import React from 'react';
import { Position } from '../../../styles/GlobalStyles';
import CheckBox from '../../common/CheckBox/CheckBox';
import Icon from '../../common/Icon/Icon';
import Image from '../../common/Image/Image';
import * as Styled from './CartProductCard.style';

function CartProductCard({ product: { name, price, imageURL }, quantity }) {
  return (
    <Styled.Container>
      <CheckBox checked={false} />

      <Image src={imageURL} width="150px" />

      <Styled.Description>
        <Position position="absolute" top="0" right="0">
          <Icon iconName="cart" />
        </Position>
        <Styled.Name>{name}</Styled.Name>
        <Styled.Counter>{quantity}</Styled.Counter>
        <Styled.Price>{price}</Styled.Price>
      </Styled.Description>
    </Styled.Container>
  );
}

export default CartProductCard;
