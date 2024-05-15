import * as S from './styled';
import minus from '../../assets/minus.svg';
import plus from '../../assets/plus.svg';
import { CartItem } from '../../api/get/getItems';
import changeQuantity from '../../api/patch/changeQuantity';

interface SetQuantityProps {
  cartItem: CartItem;
  getOneItemQuantity: (id: number) => number | undefined;
  setOneItemQuantity: (id: number, newQuantity: number) => void;
  selectedItemQuantity: (cartItem: CartItem, newQuantity: number) => void;
}

const SetQuantity = ({
  cartItem,
  getOneItemQuantity,
  setOneItemQuantity,
  selectedItemQuantity,
}: SetQuantityProps) => {
  const quantity = getOneItemQuantity(cartItem.id) ?? 0;

  const handleIncrement = async () => {
    const newQuantity = quantity + 1;
    await changeQuantity({ id: cartItem.id, quantity: newQuantity });
    setOneItemQuantity(cartItem.id, newQuantity);
    selectedItemQuantity(cartItem, newQuantity);
  };

  const handleDecrement = async () => {
    const newQuantity = Math.max(quantity - 1, 0);
    await changeQuantity({ id: cartItem.id, quantity: newQuantity });
    setOneItemQuantity(cartItem.id, newQuantity);
    selectedItemQuantity(cartItem, newQuantity);
  };

  return (
    <S.Container>
      <S.Button onClick={handleDecrement}>
        <S.Image src={minus} alt="" />
      </S.Button>
      <S.Quantity>{quantity}</S.Quantity>
      <S.Button onClick={handleIncrement}>
        <S.Image src={plus} alt="" />
      </S.Button>
    </S.Container>
  );
};

export default SetQuantity;
