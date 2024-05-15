import { CartItem } from '../../type';
import * as Styled from './style';
import CheckedBox from '../assets/CheckedBox.svg';
import UnCheckedBox from '../assets/UnCheckedBox.svg';
import PlusButton from '../assets/PlusButton.svg';
import MinusButton from '../assets/MinusButton.svg';

import { useState } from 'react';

interface ItemProp {
  cartItem: CartItem;
}

const Item = ({ cartItem }: ItemProp) => {
  const [checked, setChecked] = useState(true);

  //TODO: recoil 사용하기

  return (
    <Styled.Item>
      <Styled.Divider />
      <Styled.ButtonContainer>
        <Styled.Button onClick={() => setChecked((prop) => !prop)}>
          <img
            src={checked ? CheckedBox : UnCheckedBox}
            alt={checked ? '선택됨' : '선택되지 않음'}
          />
        </Styled.Button>
        <Styled.DeleteButton>삭제</Styled.DeleteButton>
      </Styled.ButtonContainer>

      <Styled.ItemInfoContainer>
        <Styled.ItemImg src={cartItem.product.imageUrl} />
        <Styled.ItemInfo>
          <Styled.ItemDetails>
            <Styled.ItemName>{cartItem.product.name}</Styled.ItemName>
            <Styled.ItemPrice>
              {cartItem.product.price.toLocaleString('ko-kr')}원
            </Styled.ItemPrice>
          </Styled.ItemDetails>
          <Styled.ItemQuantityAdjustment>
            <Styled.Button>
              <img src={MinusButton} alt="-"></img>
            </Styled.Button>
            <Styled.ItemQuantity>{cartItem.quantity}</Styled.ItemQuantity>
            <Styled.Button>
              <img src={PlusButton} alt="+"></img>
            </Styled.Button>
          </Styled.ItemQuantityAdjustment>
        </Styled.ItemInfo>
      </Styled.ItemInfoContainer>
    </Styled.Item>
  );
};

export default Item;
