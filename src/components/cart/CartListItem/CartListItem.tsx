import { styled } from 'styled-components';
import Image from '../../common/Image/Image';
import type { CartItem } from '../../../types/product';
import { useId } from 'react';
import Counter from '../../common/Counter/Counter';
import useCartService from '../../../hooks/useCartService';
import { formatPrice } from '../../../utils/formatPrice';

const CartListItem = (cartItem: CartItem) => {
  const { quantity, product } = cartItem;
  const { id, name, price, imageSrc } = product;
  const { updateProductQuantity, removeProductFromCart } = useCartService();
  const checkboxId = useId();

  const handleChangeQuantity = (quantity: number) => {
    updateProductQuantity(id, quantity);
  };

  const handleRemoveProduct = (quantity: number) => {
    if (quantity === 0) {
      removeProductFromCart(id);
    }
  };

  return (
    <Container>
      <CartCheckbox type="checkbox" id={checkboxId} />
      <label htmlFor={checkboxId}></label>

      <Image src={imageSrc} loading="lazy" alt={name} />
      <Title>{name}</Title>
      <Right>
        <DeleteButton type="button" aria-label="장바구니에서 삭제하기">
          <svg
            fill="none"
            width="24"
            height="24"
            shapeRendering="geometricPrecision"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path d="M3 6h18" />
            <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
            <path d="M10 11v6" />
            <path d="M14 11v6" />
          </svg>
        </DeleteButton>
        <Counter
          count={quantity}
          onChange={handleChangeQuantity}
          onBlur={handleRemoveProduct}
        />
        <Price>{formatPrice(price)}</Price>
      </Right>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 735px;
  height: 180px;
`;

const CartCheckbox = styled.input`
  appearance: none;
  width: 28px;
  height: 28px;
  border: 1px solid #22a6a2;
  border-radius: 2px;
  cursor: pointer;
  margin-right: 15px;

  &:checked {
    border: 1px solid #3288ff;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: #333;
  }
`;

const Title = styled.p`
  margin-left: 20px;
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-size: 20px;
  line-height: 24px;
  letter-spacing: 0.5px;
  color: #333333;
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  height: 145px;
  margin-left: 155px;
`;

const DeleteButton = styled.button`
  width: 24px;
  height: 24px;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

const Price = styled.p`
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: 0.5px;
  color: #333333;
`;

export default CartListItem;
