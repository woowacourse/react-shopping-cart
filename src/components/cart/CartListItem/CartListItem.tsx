import { styled } from 'styled-components';
import Image from '../../common/Image/Image';
import Counter from '../../common/Counter/Counter';
import Checkbox from '../../common/Checkbox/Checkbox';
import useCartService from '../../../hooks/useCartService';
import { formatPrice } from '../../../utils/formatPrice';
import Spacer from '../../common/Spacer/Spacer';
import type { CartItem } from '../../../types/product';

interface CartListItemProps {
  cartItem: CartItem;
  checked?: boolean;
  onChange?: (id: string) => void;
}

const CartListItem = ({
  cartItem,
  checked = false,
  onChange,
}: CartListItemProps) => {
  const { id: cartItemId, quantity, product } = cartItem;
  const { id, name, price, imageSrc } = product;
  const { updateProductQuantity, removeProductFromCart } = useCartService();

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
      <Inner>
        <Checkbox id={cartItemId} checked={checked} onChange={onChange} />
        <Spacer width={15} />
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
          <Price>{formatPrice(quantity * price)}</Price>
        </Right>
      </Inner>
    </Container>
  );
};

const Container = styled.li`
  height: 203px;
`;

const Inner = styled.div`
  display: flex;
  padding-top: 23px;
`;

const Title = styled.p`
  margin-left: 20px;
  font-family: 'Noto Sans KR';
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
  margin-left: auto;
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
  font-size: 18px;
  line-height: 24px;
  letter-spacing: 0.5px;
  color: #333333;
`;

export default CartListItem;
