import { SquareImage } from '../../../commons/SquareImage/SquareImage.styled';
import { Product } from '../../../../types/Product';
import CartCheckbox from '../CartCheckbox/CartCheckbox';
import CartDeleteButton from '../CartDeleteButton/CartDeleteButton';
import CartStepper from '../CartStepper/CartStepper';

interface CartSingleItemProps extends Product {
  quantity: number;
}

const CartSingleItem = (props: CartSingleItemProps) => {
  const { id, quantity, name, imageUrl, price } = props;

  return (
    <div>
      <CartCheckbox productId={id} productName={name} />
      <SquareImage size="l" src={imageUrl} alt="" />
      <p>{name}</p>
      <div>
        <CartDeleteButton productId={id} productName={name} />
        <CartStepper productId={id} defaultValue={quantity} />
        <p>{price}</p>
      </div>
    </div>
  );
};

export default CartSingleItem;
