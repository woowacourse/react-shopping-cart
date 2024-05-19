import { ProductType } from '../../type';
import * as Styled from './style';
import CheckedBox from '../assets/CheckedBox.svg';
import UnCheckedBox from '../assets/UnCheckedBox.svg';
import PlusButton from '../assets/PlusButton.svg';
import MinusButton from '../assets/MinusButton.svg';
import BlockMinusButton from '../assets/BlockMinusButton.svg';
import { useRecoilState } from 'recoil';
import { selectedCartItemsState } from '../../recoil/selectedCardItems';
import { adjustCartItemQuantity } from '../../api/shoppingCart';
import { cartItemQuantity } from '../../recoil/cartItems';

interface ItemProp {
  id: number;
  cartItemProduct: ProductType;
  onRemoveItem: (id: number) => void;
}
const CartItem = ({ id, cartItemProduct, onRemoveItem }: ItemProp) => {
  const [isSelected, setIsSelected] = useRecoilState(
    selectedCartItemsState(id),
  );

  const [quantity, setQuantity] = useRecoilState(cartItemQuantity(id));

  const handleAdjustCartItemQuantity = async (
    cartItemId: number,
    updateQuantity: number,
  ) => {
    try {
      await adjustCartItemQuantity(cartItemId, updateQuantity);
      setQuantity(updateQuantity);
    } catch (error) {
      console.error('수량변경 실패', error);
    }
  };

  return (
    <Styled.Item>
      <>
        <Styled.Divider />
        <Styled.ButtonContainer>
          <Styled.Button onClick={() => setIsSelected((prop) => !prop)}>
            <img
              src={isSelected ? CheckedBox : UnCheckedBox}
              alt={isSelected ? '선택됨' : '선택되지 않음'}
            />
          </Styled.Button>
          <Styled.DeleteButton onClick={() => onRemoveItem(id)}>
            삭제
          </Styled.DeleteButton>
        </Styled.ButtonContainer>
        <Styled.ItemInfoContainer>
          <Styled.ItemImg src={cartItemProduct.imageUrl} />
          <Styled.ItemInfo>
            <Styled.ItemDetails>
              <Styled.ItemName>{cartItemProduct.name}</Styled.ItemName>
              <Styled.ItemPrice>
                {cartItemProduct.price.toLocaleString('ko-kr')}원
              </Styled.ItemPrice>
            </Styled.ItemDetails>
            <Styled.ItemQuantityAdjustment>
              <Styled.Button
                onClick={() => {
                  if (quantity === 1) return;
                  const updatedItemQuantity = quantity - 1;
                  handleAdjustCartItemQuantity(id, updatedItemQuantity);
                }}
              >
                <img
                  src={quantity === 1 ? BlockMinusButton : MinusButton}
                  alt="-"
                ></img>
              </Styled.Button>
              <Styled.ItemQuantity>{quantity}</Styled.ItemQuantity>
              <Styled.Button
                onClick={() => {
                  const updatedItemQuantity = quantity + 1;
                  handleAdjustCartItemQuantity(id, updatedItemQuantity);
                }}
              >
                <img src={PlusButton} alt="+"></img>
              </Styled.Button>
            </Styled.ItemQuantityAdjustment>
          </Styled.ItemInfo>
        </Styled.ItemInfoContainer>
      </>
    </Styled.Item>
  );
};

export default CartItem;
