import * as Styled from '../style';

import Divider from '../../Divider/Divider';

import MESSAGE from '../../../constants/Message';
import { CartItemType } from '../../../type';

interface CartItemProps {
  inputCartItem: CartItemType;
}

const OrderConfirmationCartItem = ({ inputCartItem }: CartItemProps) => {
  return (
    <Styled.CartItem>
      <Divider />

      <Styled.ItemInfoContainer>
        <Styled.ItemImg src={inputCartItem.product.imageUrl} />
        <Styled.ItemInfo>
          <Styled.ItemDetails>
            <Styled.ItemName>{inputCartItem.product.name}</Styled.ItemName>
            <Styled.ItemPrice>
              {inputCartItem.product.price.toLocaleString('ko-kr')}
              {MESSAGE.koreanCurrencyUnit}
            </Styled.ItemPrice>
          </Styled.ItemDetails>

          <Styled.ItemQuantity>
            {inputCartItem.quantity}
            {MESSAGE.countUnit}
          </Styled.ItemQuantity>
        </Styled.ItemInfo>
      </Styled.ItemInfoContainer>
    </Styled.CartItem>
  );
};

export default OrderConfirmationCartItem;
