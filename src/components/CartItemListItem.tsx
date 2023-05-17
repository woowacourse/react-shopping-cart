import { styled } from 'styled-components';
import DeleteIcon from '../assets/icons/delete.svg';
import useCartItem from '../hooks/useCartItem';
import type { CartItem } from '../type';
import Stepper from './Stepper';

const CartItemListItemContainer = styled.div`
  display: flex;
  gap: 20px;

  width: 100%;
`;

const ProductImage = styled.img`
  width: 140px;
  height: 140px;

  background: gray;
  aspect-ratio: 1 / 1;
  object-fit: cover;
`;

const ProductName = styled.h1`
  flex: 1;

  font-size: 20px;
  font-weight: 400;
  color: #333333;
`;

const CartController = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 20px;
`;

const ProductPrice = styled.h2`
  &::after {
    content: '원';
  }
`;

const DeleteButton = styled.button``;

type CartItemListItemProps = {
  cartItem: CartItem;
};

const CartItemListItem = (props: CartItemListItemProps) => {
  const { cartItem } = props;
  const { setQuantity } = useCartItem(cartItem.product);

  const handleChangeQuantityWithinSafeRange = (quantity: number) => {
    setQuantity(Math.max(1, quantity));
  };

  return (
    <CartItemListItemContainer>
      <ProductImage src={`images/products/${cartItem.product.id}.png`} />
      <ProductName>{cartItem.product.name}</ProductName>

      <CartController>
        <DeleteButton onClick={() => setQuantity(0)}>
          <img src={DeleteIcon} alt="삭제" />
        </DeleteButton>
        <Stepper value={cartItem.quantity} onChange={handleChangeQuantityWithinSafeRange} />
        <ProductPrice>
          {(cartItem.product.price * cartItem.quantity).toLocaleString('ko')}
        </ProductPrice>
      </CartController>
    </CartItemListItemContainer>
  );
};

export default CartItemListItem;
