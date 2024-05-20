import { CartItem } from '../../type';
import * as Styled from './style';
import selectedBox from '../assets/SelectedBox.svg';
import UnSelectedBox from '../assets/UnSelectedBox.svg';
import PlusButton from '../assets/PlusButton.svg';
import MinusButton from '../assets/MinusButton.svg';
import RemoveButton from '../assets/RemoveButton.svg';
import { useRecoilState } from 'recoil';
import { selectedCartItemState } from '../../recoil/selectedCardItems';
import MESSAGE from '../../constants/Message';
import CONDITION from '../../constants/Condition';

interface ItemProp {
  cartItem: CartItem;
  onRemoveItem: (id: number) => void;
  onAdjustItemQuantity: (cartItemId: number, quantity: number) => void;
}
const Item = ({ cartItem, onRemoveItem, onAdjustItemQuantity }: ItemProp) => {
  const [isSelected, setIsSelected] = useRecoilState(
    selectedCartItemState(cartItem.id),
  );

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
        <Styled.RemoveButton onClick={() => onRemoveItem(cartItem.id)}>
          {MESSAGE.remove}
        </Styled.RemoveButton>
      </Styled.ButtonContainer>
      <Styled.ItemInfoContainer>
        <Styled.ItemImg src={cartItem.product.imageUrl} />
        <Styled.ItemInfo>
          <Styled.ItemDetails>
            <Styled.ItemName>{cartItem.product.name}</Styled.ItemName>
            <Styled.ItemPrice>
              {cartItem.product.price.toLocaleString('ko-kr')}
              {MESSAGE.koreanCurrencyUnit}
            </Styled.ItemPrice>
          </Styled.ItemDetails>
          <Styled.ItemQuantityAdjustment>
            <Styled.SelectButton
              onClick={() => {
                onAdjustItemQuantity(cartItem.id, cartItem.quantity - 1);
              }}
            >
              <img
                src={
                  cartItem.quantity === CONDITION.RemoveButtonAppeared
                    ? RemoveButton
                    : MinusButton
                }
                alt={
                  cartItem.quantity === CONDITION.RemoveButtonAppeared
                    ? MESSAGE.removeButton
                    : MESSAGE.minusButton
                }
              />
            </Styled.SelectButton>
            <Styled.ItemQuantity>{cartItem.quantity}</Styled.ItemQuantity>
            <Styled.SelectButton
              onClick={() => {
                onAdjustItemQuantity(cartItem.id, cartItem.quantity + 1);
              }}
            >
              <img src={PlusButton} alt={MESSAGE.plusButton} />
            </Styled.SelectButton>
          </Styled.ItemQuantityAdjustment>
        </Styled.ItemInfo>
      </Styled.ItemInfoContainer>
    </Styled.Item>
  );
};

export default Item;
