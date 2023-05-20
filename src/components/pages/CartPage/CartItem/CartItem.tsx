import { SquareImage } from '../../../commons/SquareImage/SquareImage.styled';
import { Product } from '../../../../types/Product';
import CartCheckbox from '../CartCheckbox/CartCheckbox';
import CartDeleteButton from '../CartDeleteButton/CartDeleteButton';
import CartStepper from '../CartStepper/CartStepper';

import * as Styled from './CartItem.styled';

interface CartSingleItemProps extends Product {
  quantity: number;
}

const CartSingleItem = (props: CartSingleItemProps) => {
  const { id, quantity, name, imageUrl, price } = props;

  return (
    <Styled.CartItemDiv>
      <Styled.NameDiv>
        <CartCheckbox productId={id} productName={name} />
        <SquareImage size="l" src={imageUrl} alt="" />
        <p>{name}</p>
      </Styled.NameDiv>
      <Styled.CountDiv>
        <CartDeleteButton productId={id} productName={name} />
        <CartStepper productId={id} defaultValue={quantity} />
        <p>{price.toLocaleString('ko-KR')}원</p>
      </Styled.CountDiv>
    </Styled.CartItemDiv>
  );
};

export default CartSingleItem;
