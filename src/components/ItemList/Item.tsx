import { CartItem } from '../../type';
import * as Styled from './style';
import CheckedBox from '../assets/CheckedBox.svg';
import UnCheckedBox from '../assets/UnCheckedBox.svg';
import PlusButton from '../assets/PlusButton.svg';
import MinusButton from '../assets/MinusButton.svg';
import BinButton from '../assets/BinButton.svg';
import { useRecoilState } from 'recoil';
import { SelectedCartItems } from '../../recoil/selectedCardItems';

interface ItemProp {
  cartItem: CartItem;
  onRemoveItem: (id: number) => void;
  onAdjustItemQuantity: (cartItemId: number, quantity: number) => void;
}
const Item = ({ cartItem, onRemoveItem, onAdjustItemQuantity }: ItemProp) => {
  const [isSelected, setIsSelected] = useRecoilState(
    SelectedCartItems(cartItem.id),
  );

  return (
    <Styled.Item>
      <Styled.Divider />
      <Styled.ButtonContainer>
        <Styled.Button onClick={() => setIsSelected((prop) => !prop)}>
          <img
            src={isSelected ? CheckedBox : UnCheckedBox}
            alt={isSelected ? '선택됨' : '선택되지 않음'}
          />
        </Styled.Button>
        <Styled.DeleteButton onClick={() => onRemoveItem(cartItem.id)}>
          삭제
        </Styled.DeleteButton>
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
            <Styled.Button
              onClick={() => {
                const updatedItemQuantity = cartItem.quantity - 1;
                onAdjustItemQuantity(cartItem.id, updatedItemQuantity);
              }}
            >
              <img
                src={cartItem.quantity === 1 ? BinButton : MinusButton}
                alt="-"
              ></img>
            </Styled.Button>
            <Styled.ItemQuantity>{cartItem.quantity}</Styled.ItemQuantity>
            <Styled.Button
              onClick={() => {
                const updatedItemQuantity = cartItem.quantity + 1;
                onAdjustItemQuantity(cartItem.id, updatedItemQuantity);
              }}
            >
              <img src={PlusButton} alt="+"></img>
            </Styled.Button>
          </Styled.ItemQuantityAdjustment>
        </Styled.ItemInfo>
      </Styled.ItemInfoContainer>
    </Styled.Item>
  );
};

export default Item;
