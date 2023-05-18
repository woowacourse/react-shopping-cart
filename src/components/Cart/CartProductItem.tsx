import { styled } from 'styled-components';

import AmountCounter from '../Common/AmountCounter';
import Image from '../Common/Image';

import TrashCanIcon from '../../assets/TrashCanIcon';
import { CartProduct } from '../../types/product';
import CheckBox from '../Common/CheckBox';

interface CartProductItemProps {
  cartProduct: CartProduct;
}

const CartProductItem = ({ cartProduct }: CartProductItemProps) => {
  const { id, quantity, product } = cartProduct;
  const { name, price, imageUrl } = product;

  return (
    <CartProductContainer>
      <CheckBox id={`cart-product-check-${id}`} />
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
          variant='medium'
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
