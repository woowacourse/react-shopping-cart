import styled from 'styled-components';

import CheckBox from '../Common/CheckBox';
import Image from '../Common/Image';

import type { CartProduct } from '../../types/product';
import TrashCanIcon from '../../assets/TrashCanIcon';
import AmountCounter from '../Common/AmountCounter';
import useProductQuantity from '../../hooks/useProductQuantity';

interface CartProductItemProps {
  cartProduct: CartProduct;
}

const CartProductItem = ({ cartProduct }: CartProductItemProps) => {
  const { quantity, product } = cartProduct;
  const { id, name, price, imageUrl } = product;
  const { addCount, subtractCount } = useProductQuantity(id);

  return (
    <CartProductItemContainer>
      <CartProductLeftWrapper>
        <CheckBoxWrapper>
          <CheckBox />
        </CheckBoxWrapper>
        <Image
          src={`${process.env.PUBLIC_URL}/${imageUrl}`}
          alt={name}
          loading='lazy'
          size='small'
        />
      </CartProductLeftWrapper>
      <CartProductName>{name}</CartProductName>
      <CartProductRightWrapper>
        <button>
          <TrashCanIcon />
        </button>
        <AmountCounter
          width={55}
          height={45}
          buttonWidth={34}
          count={quantity}
          addCount={addCount}
          subtractCount={subtractCount}
        />
        <p>{price.toLocaleString('ko-KR')}원</p>
      </CartProductRightWrapper>
    </CartProductItemContainer>
  );
};

const CartProductItemContainer = styled.div`
  display: flex;
`;

const CartProductLeftWrapper = styled.div`
  display: flex;
`;

const CheckBoxWrapper = styled.div`
  margin-right: 15px;
`;

const CartProductName = styled.p`
  margin: 0 155px 0 20px;
`;

const CartProductRightWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
`;

export default CartProductItem;
