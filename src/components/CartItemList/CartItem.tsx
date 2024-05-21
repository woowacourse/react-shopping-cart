import { ProductType } from '../../type';
import * as Styled from './style';
import CheckedBox from '../assets/CheckedBox.svg';
import UnCheckedBox from '../assets/UnCheckedBox.svg';
import PlusButton from '../assets/PlusButton.svg';
import MinusButton from '../assets/MinusButton.svg';
import BlockMinusButton from '../assets/BlockMinusButton.svg';
import { useRecoilState } from 'recoil';
import { selectedCartItemsState } from '../../recoil/selectedCardItems';
import useAdjustCartItemQuantity from '../../hooks/useAdjustCartItemQuantity';

interface CartItemProp {
  id: number;
  cartItemProduct: ProductType;
  onRemoveItem: (id: number) => void;
}
const CartItem = ({ id, cartItemProduct, onRemoveItem }: CartItemProp) => {
  const [isSelected, setIsSelected] = useRecoilState(
    selectedCartItemsState(id),
  );

  const { minusCartItemQuantity, plusCartItemQuantity, cartItemQuantity } =
    useAdjustCartItemQuantity(id);

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
              <Styled.Button onClick={minusCartItemQuantity}>
                <img
                  src={cartItemQuantity === 1 ? BlockMinusButton : MinusButton}
                  alt="-"
                ></img>
              </Styled.Button>
              <Styled.ItemQuantity>{cartItemQuantity}</Styled.ItemQuantity>
              <Styled.Button onClick={plusCartItemQuantity}>
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
