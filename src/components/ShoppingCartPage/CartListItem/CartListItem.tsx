import * as Styled from './CartListItem.styles';
import Checkbox from '../../commons/Checkbox/Checkbox';
import NumberInput from '../../commons/NumberInput/NumberInput';
import trashCanSVG from '../../../assets/svgs/trash-can.svg';
import noImagePNG from '../../../assets/images/no-image.png';
import { CartItem } from '../../../type';

export interface Props {
  name: string;
  price: string;
  thumbnail?: string;
  quantity: CartItem['quantity'];
  setQuantity: (quantity: CartItem['quantity']) => void;
  isSelected: boolean;
  setSelected: (isSelected: CartItem['isSelected']) => void;
  onCartItemDelete: () => void;
}

const CartListItem = ({
  name,
  price,
  thumbnail = noImagePNG,
  quantity,
  setQuantity,
  isSelected,
  setSelected,
  onCartItemDelete,
}: Props) => {
  return (
    <Styled.CartListItem>
      <Checkbox checked={isSelected} onCheck={setSelected} />
      <Styled.Thumbnail src={thumbnail} alt="cart item thumbnail" />
      <Styled.ItemContentWrapper>
        <Styled.ItemContentTop>
          <Styled.ItemName>{name}</Styled.ItemName>
          <Styled.DeleteIcon src={trashCanSVG} alt="cart item delete button" onClick={onCartItemDelete} />
        </Styled.ItemContentTop>
        <Styled.ItemContentBottom>
          <NumberInput value={quantity} setValue={setQuantity} />
          <Styled.Price>{price}원</Styled.Price>
        </Styled.ItemContentBottom>
      </Styled.ItemContentWrapper>
    </Styled.CartListItem>
  );
};

export default CartListItem;
