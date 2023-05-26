import type { ChangeEventHandler } from 'react';
import styled from 'styled-components';

import AmountCounter from '../Common/AmountCounter';
import Image from '../Common/Image';
import CheckBox from '../Common/CheckBox';

import TrashCanIcon from '../../assets/TrashCanIcon';
import type { CartProduct } from '../../types/product';
import useProductQuantity from '../../hooks/useProductQuantity';
import useChecked from '../../hooks/useChecked';

interface CartProductItemProps {
  cartProduct: CartProduct;
}

const CartProductItem = ({ cartProduct }: CartProductItemProps) => {
  const { id, quantity, product } = cartProduct;
  const { name, price, imageUrl } = product;

  const { addCount, subtractCount, deleteProduct } = useProductQuantity(
    id,
    quantity
  );
  const { targetChecked, updateChecked, deleteChecked } = useChecked(id);

  const toggleProductChecked: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    updateChecked(event.currentTarget.checked);
  };

  const deleteProductAndChecked = () => {
    deleteProduct();
    deleteChecked();
  };

  return (
    <CartProductContainer>
      <CheckBox
        id={`cart-product-check-${id}`}
        onChange={toggleProductChecked}
        checked={!!targetChecked}
      />
      <Image
        src={`${process.env.PUBLIC_URL}/${imageUrl}`}
        alt={name}
        loading='lazy'
        size='small'
      />
      <ProductName>{name}</ProductName>
      <CartInfoContainer>
        <DeleteButton type='button' onClick={deleteProductAndChecked}>
          <TrashCanIcon />
        </DeleteButton>
        <AmountCounter
          count={quantity}
          addCount={addCount}
          subtractCount={subtractCount}
          minCount={1}
          variant='medium'
        />
        <ProductPrice>
          {(price * quantity).toLocaleString('ko-KR')}원
        </ProductPrice>
      </CartInfoContainer>
    </CartProductContainer>
  );
};

const CartProductContainer = styled.div`
  position: relative;
  width: 100%;

  @media (min-width: ${({ theme }) => theme.breakPoints.small}) {
    display: flex;
    column-gap: 15px;
  }
`;

const ProductName = styled.p`
  margin: 10px 0 0 0;
  font-size: 16px;
  height: 24px;
  line-height: 24px;
  flex-grow: 1;

  @media (min-width: ${({ theme }) => theme.breakPoints.small}) {
    margin: 0;
    font-size: 20px;
    line-height: 1.5;
  }
`;

const CartInfoContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;

  @media (min-width: ${({ theme }) => theme.breakPoints.small}) {
    position: static;
    height: initial;
  }
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
