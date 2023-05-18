import { styled } from 'styled-components';

import AmountCounter from '../Common/AmountCounter';
import Image from '../Common/Image';

import TrashCanIcon from '../../assets/TrashCanIcon';
import { CartProduct } from '../../types/product';

interface CartProductItemProps {
  cartProduct: CartProduct;
}

const CartProductItem = ({ cartProduct }: CartProductItemProps) => {
  const { id, quantity, product } = cartProduct;
  const { name, price, imageUrl } = product;

  return (
    <CartProductContainer>
      <div>
        <CheckBox type='checkbox' id={`cart-product-check-${id}`} />
        <label htmlFor={`cart-product-check-${id}`}></label>
      </div>
      <Image
        src={`${process.env.PUBLIC_URL}/${imageUrl}`}
        alt={name}
        loading='lazy'
        size='small'
      />
      <ProductName>{name}</ProductName>
      <CartInfoContainer>
        <DeleteButton type='button'>
          <TrashCanIcon />
        </DeleteButton>
        <AmountCounter
          count={quantity}
          addCount={() => {}}
          subtractCount={() => {}}
        />
        <ProductPrice>{price.toLocaleString('ko-KR')}원</ProductPrice>
      </CartInfoContainer>
    </CartProductContainer>
  );
};

const CartProductContainer = styled.div`
  display: flex;
  column-gap: 15px;
  width: 100%;
`;

const CheckBox = styled.input`
  display: none;

  + label {
    position: relative;
    display: inline-block;
    width: 28px;
    height: 28px;
    border: 1px solid ${({ theme }) => theme.colors.primary};
    border-radius: 2px;
  }

  &:checked + label {
    background: ${({ theme }) => theme.colors.black};
  }

  &:checked + label::after {
    content: '';
    position: absolute;
    top: 40%;
    left: 50%;
    width: 8px;
    height: 16px;
    border: solid ${({ theme }) => theme.colors.white};
    border-width: 0 3px 3px 0;
    transform: translate(-50%, -50%) rotate(45deg);
  }
`;

const ProductName = styled.p`
  font-size: 20px;
  flex-grow: 1;
`;

const CartInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
`;

const DeleteButton = styled.button`
  height: 24px;
  line-height: 24px;
`;

const ProductPrice = styled.p`
  height: 24px;
  line-height: 24px;
`;

export default CartProductItem;
