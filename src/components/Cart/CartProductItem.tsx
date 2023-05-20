import styled from 'styled-components';

import CheckBox from '../Common/CheckBox';
import Image from '../Common/Image';
import AmountCounter from '../Common/AmountCounter';

import type { CartProduct } from '../../types/product';
import TrashCanIcon from '../../assets/TrashCanIcon';
import useCartProducts from '../../hooks/useCartProducts';
import useCheckedProducts from '../../hooks/useCheckedProducts';

interface CartProductItemProps {
  cartProduct: CartProduct;
}

const CartProductItem = ({ cartProduct }: CartProductItemProps) => {
  const { quantity, product } = cartProduct;
  const { name, price, imageUrl } = product;
  const { removeProduct, addCount, subtractCount } = useCartProducts(product);
  const { handleCheckBoxChange, isCheckedProduct } = useCheckedProducts();

  return (
    <CartProductItemContainer>
      <CartProductLeftWrapper>
        <CheckBoxWrapper>
          <CheckBox
            onChange={() => handleCheckBoxChange(cartProduct)}
            checked={isCheckedProduct(cartProduct)}
          />
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
        <button onClick={removeProduct}>
          <TrashCanIcon />
        </button>
        <AmountCounter
          designType='cart'
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
  white-space: nowrap;
`;

const CartProductRightWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
`;

export default CartProductItem;
