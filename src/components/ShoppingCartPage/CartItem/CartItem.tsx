import * as Styled from './CartItem.styles';
import Checkbox from '../../commons/Checkbox/Checkbox';
import NumberInput from '../../commons/NumberInput/NumberInput';
import trashCanSVG from '../../../assets/svgs/trash-can.svg';
import noImagePNG from '../../../assets/images/no-image.png';

export interface Props {
  name: string;
  price: string;
  thumbnail?: string;
  quantity: CartItem['quantity'];
  setQuantity: (quantity: CartItem['quantity']) => void;
  isSelected: boolean;
  setSelected: (isSelected: CartItem['isSelected']) => void;
  onDeleteCartItem: () => void;
}

const CartItem = ({
  name,
  price,
  thumbnail = noImagePNG,
  quantity,
  setQuantity,
  isSelected,
  setSelected,
  onDeleteCartItem,
}: Props) => {
  return (
    <Styled.CartItem>
      <Checkbox isChecked={isSelected} onCheck={setSelected} />
      <Styled.Thumbnail src={thumbnail} alt="카트 아이템 이미지" />
      <Styled.ItemContentWrapper>
        <Styled.ItemContentTop>
          <Styled.ItemName>{name}</Styled.ItemName>
          <Styled.DeleteIcon src={trashCanSVG} alt="카트 아이템 삭제 버튼" onClick={onDeleteCartItem} />
        </Styled.ItemContentTop>
        <Styled.ItemContentBottom>
          <NumberInput value={quantity} setValue={setQuantity} />
          <Styled.Price>{price}원</Styled.Price>
        </Styled.ItemContentBottom>
      </Styled.ItemContentWrapper>
    </Styled.CartItem>
  );
};

export default CartItem;
