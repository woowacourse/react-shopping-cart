import * as Styled from '../style';

import { useRecoilState, useSetRecoilState } from 'recoil';

import { cartItemsState, isCartItemSelectedState } from '../../../recoil/atoms';

import {
  fetchAdjustCartItemQuantity,
  fetchRemoveCartItem,
} from '../../../api/shoppingCart';

import selectedBox from '../../../assets/SelectedBox.svg';
import UnSelectedBox from '../../../assets/UnSelectedBox.svg';
import PlusButton from '../../../assets/PlusButton.svg';
import MinusButton from '../../../assets/MinusButton.svg';
import RemoveButton from '../../../assets/RemoveButton.svg';

import MESSAGE from '../../../constants/Message';
import CONDITION from '../../../constants/Condition';
import VALUE from '../../../constants/Value';
import Divider from '../../Divider/Divider';

import { CartItemType } from '../../../type';

interface CartItemProps {
  inputCartItem: CartItemType;
}

const ShoppingCartItem = ({ inputCartItem }: CartItemProps) => {
  const [isSelected, setIsSelected] = useRecoilState(
    isCartItemSelectedState(inputCartItem.id),
  );

  const setCartItems = useSetRecoilState(cartItemsState);

  const removeCartItem = () => {
    setCartItems((prevCartItems) =>
      [...prevCartItems].filter((cartItem) => cartItem.id !== inputCartItem.id),
    );
  };

  const adjustCartItemQuantity = (adjustedQuantity: number) => {
    setCartItems((prevCartItems) =>
      [...prevCartItems].map((cartItem) => {
        if (cartItem.id === inputCartItem.id)
          return {
            id: cartItem.id,
            product: cartItem.product,
            quantity: adjustedQuantity,
          };

        return cartItem;
      }),
    );
  };

  const handleCartItemRemoval = async () => {
    try {
      removeCartItem();
      await fetchRemoveCartItem(inputCartItem.id);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCartItemQuantityIncrement = async () => {
    try {
      adjustCartItemQuantity(inputCartItem.quantity + VALUE.adjustTerm);
      await fetchAdjustCartItemQuantity(
        inputCartItem.id,
        inputCartItem.quantity + VALUE.adjustTerm,
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleCartItemQuantityDecrement = async () => {
    try {
      if (inputCartItem.quantity === CONDITION.RemoveButtonAppeared)
        return await handleCartItemRemoval();

      adjustCartItemQuantity(inputCartItem.quantity - VALUE.adjustTerm);
      await fetchAdjustCartItemQuantity(
        inputCartItem.id,
        inputCartItem.quantity - VALUE.adjustTerm,
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Styled.CartItem>
      <Divider />

      <Styled.ButtonContainer>
        <Styled.SelectButton onClick={() => setIsSelected((prop) => !prop)}>
          <img
            src={isSelected ? selectedBox : UnSelectedBox}
            alt={isSelected ? MESSAGE.selected : MESSAGE.unSelected}
          />
        </Styled.SelectButton>
        <Styled.RemoveButton onClick={() => handleCartItemRemoval()}>
          {MESSAGE.removal}
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
            <Styled.SelectButton
              onClick={() => handleCartItemQuantityDecrement()}
            >
              <img
                src={
                  inputCartItem.quantity === CONDITION.RemoveButtonAppeared
                    ? RemoveButton
                    : MinusButton
                }
                alt={
                  inputCartItem.quantity === CONDITION.RemoveButtonAppeared
                    ? MESSAGE.removalButton
                    : MESSAGE.minusButton
                }
              />
            </Styled.SelectButton>
            <Styled.ItemQuantity>{inputCartItem.quantity}</Styled.ItemQuantity>
            <Styled.SelectButton
              onClick={() => handleCartItemQuantityIncrement()}
            >
              <img src={PlusButton} alt={MESSAGE.plusButton} />
            </Styled.SelectButton>
          </Styled.ItemQuantityAdjustment>
        </Styled.ItemInfo>
      </Styled.ItemInfoContainer>
    </Styled.CartItem>
  );
};

export default ShoppingCartItem;
