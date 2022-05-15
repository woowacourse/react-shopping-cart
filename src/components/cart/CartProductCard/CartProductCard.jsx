import React from 'react';
import { Position } from '../../../styles/GlobalStyles';
import CheckBox from '../../common/CheckBox/CheckBox';
import Counter from '../../common/Counter/Counter';
import Icon from '../../common/Icon/Icon';
import Image from '../../common/Image/Image';
import * as Styled from './CartProductCard.style';

function CartProductCard({ product: { name, price, imageURL }, quantity, checked, setChecked }) {
  return (
    <Styled.Container>
      <CheckBox checked={checked} onClick={setChecked} />

      <Image src={imageURL} width="150px" />

      <Styled.Description>
        <Position position="absolute" top="0" right="0">
          <Icon iconName="trash" fill="#333333" />
        </Position>
        <Styled.Name>{name}</Styled.Name>
        <Counter count={quantity} />
        <Styled.Price>{price * quantity}원</Styled.Price>
      </Styled.Description>
    </Styled.Container>
  );
}

export default React.memo(CartProductCard);
