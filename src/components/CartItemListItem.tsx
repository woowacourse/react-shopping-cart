import { styled } from 'styled-components';
import DeleteIcon from '../assets/icons/delete.svg';
import useCartActions from '../hooks/useCartActions';
import type { Product } from '../type';
import Stepper from './common/Stepper';

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
  quantity: number;
  product: Product;
};

const CartItemListItem = (props: CartItemListItemProps) => {
  const { quantity, product } = props;
  const { setQuantity } = useCartActions();

  const handleChangeQuantityWithinSafeRange = (newQuantity: number) => {
    setQuantity(product, Math.max(1, newQuantity));
  };

  return (
    <CartItemListItemContainer>
      <ProductImage src={product.imageUrl} />
      <ProductName>{product.name}</ProductName>

      <CartController>
        <DeleteButton onClick={() => setQuantity(product, 0)}>
          <img src={DeleteIcon} alt="삭제" />
        </DeleteButton>
        <Stepper variant="large" value={quantity} onChange={handleChangeQuantityWithinSafeRange} />
        <ProductPrice>{(product.price * quantity).toLocaleString('ko')}</ProductPrice>
      </CartController>
    </CartItemListItemContainer>
  );
};

export default CartItemListItem;
