import { useRecoilState } from 'recoil';
import { updateCartItemQuantity } from '../../../api';
import MinusIcon from '../../../assets/minusIcon.png';
import PlusIcon from '../../../assets/plusIcon.png';
import { cartItemQuantity } from '../../../recoil/atoms';
import BorderButton from '../../common/BorderButton';
import QuantityContainer from './style';

export default function CartItemQuantity({ itemId }: { itemId: number }) {
  const [quantity, setQuantity] = useRecoilState(cartItemQuantity(itemId));

  const updateQuantity = (newQuantity: number) => {
    updateCartItemQuantity(itemId, newQuantity).then(() => {
      setQuantity(newQuantity);
    });
  };

  const handleIncreaseQuantity = () => {
    const newQuantity = quantity + 1;
    updateQuantity(newQuantity);
  };

  const handleDecreaseQuantity = () => {
    const newQuantity = quantity - 1;
    if (newQuantity >= 1) {
      updateQuantity(newQuantity);
    }
  };

  return (
    <QuantityContainer>
      <BorderButton onClick={handleDecreaseQuantity} size="small">
        <img src={MinusIcon} />
      </BorderButton>
      <p className="quantity">{quantity}</p>
      <BorderButton onClick={handleIncreaseQuantity} size="small">
        <img src={PlusIcon} />
      </BorderButton>
    </QuantityContainer>
  );
}
