import * as Styled from './style';

import { useRecoilState, useSetRecoilState } from 'recoil';
import { selectedCartItemState } from '../../recoil/selectedCardItems';
import { cartItemsState } from '../../recoil/cartItems';

import selectedBox from '../assets/SelectedBox.svg';
import UnSelectedBox from '../assets/UnSelectedBox.svg';
import PlusButton from '../assets/PlusButton.svg';
import MinusButton from '../assets/MinusButton.svg';
import RemoveButton from '../assets/RemoveButton.svg';

import MESSAGE from '../../constants/Message';
import CONDITION from '../../constants/Condition';
import { CartItemType } from '../../type';

type OperatorType = 'increase' | 'decrease';

interface CartItemProps {
  inputCartItem: CartItemType;
}

const CartItem = ({ inputCartItem }: CartItemProps) => {
  const [isSelected, setIsSelected] = useRecoilState(
    selectedCartItemState(inputCartItem.id),
  );

  const setCartItems = useSetRecoilState(cartItemsState);

  const handleRemoveCartItem = () => {
    setCartItems((prevCartItems) =>
      [...prevCartItems].filter((cartItem) => cartItem.id !== inputCartItem.id),
    );
  };

  const adjustCartItemQuantity = (operator: OperatorType) => {
    setCartItems((prevCartItems) =>
      [...prevCartItems].map((cartItem) => {
        if (cartItem.id === inputCartItem.id)
          return {
            id: cartItem.id,
            product: cartItem.product,
            quantity:
              operator === 'increase'
                ? cartItem.quantity + CONDITION.adjustTerm
                : cartItem.quantity - CONDITION.adjustTerm,
          };

        return cartItem;
      }),
    );
  };

  const handleIncreaseCartItemQuantity = () => {
    adjustCartItemQuantity('increase');
  };

  const handleDecreaseCartItemQuantity = () => {
    adjustCartItemQuantity('decrease');

    if (inputCartItem.quantity === CONDITION.RemoveButtonAppeared)
      handleRemoveCartItem();
  };

  return (
    <Styled.Item>
      <Styled.Divider />

      <Styled.ButtonContainer>
        <Styled.SelectButton onClick={() => setIsSelected((prop) => !prop)}>
          <img
            src={isSelected ? selectedBox : UnSelectedBox}
            alt={isSelected ? MESSAGE.selected : MESSAGE.unSelected}
          />
        </Styled.SelectButton>
        <Styled.RemoveButton onClick={handleRemoveCartItem}>
          {MESSAGE.remove}
        </Styled.RemoveButton>
      </Styled.ButtonContainer>

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
          <Styled.ItemQuantityAdjustment>
            <Styled.SelectButton onClick={handleDecreaseCartItemQuantity}>
              <img
                src={
                  inputCartItem.quantity === CONDITION.RemoveButtonAppeared
                    ? RemoveButton
                    : MinusButton
                }
                alt={
                  inputCartItem.quantity === CONDITION.RemoveButtonAppeared
                    ? MESSAGE.removeButton
                    : MESSAGE.minusButton
                }
              />
            </Styled.SelectButton>
            <Styled.ItemQuantity>{inputCartItem.quantity}</Styled.ItemQuantity>
            <Styled.SelectButton onClick={handleIncreaseCartItemQuantity}>
              <img src={PlusButton} alt={MESSAGE.plusButton} />
            </Styled.SelectButton>
          </Styled.ItemQuantityAdjustment>
        </Styled.ItemInfo>
      </Styled.ItemInfoContainer>
    </Styled.Item>
  );
};

export default CartItem;
