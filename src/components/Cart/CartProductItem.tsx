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
  justify-content: space-around;
`;

const CheckBoxWrapper = styled.div`
  margin-right: 15px;
`;

const CartProductName = styled.p`
  width: 50%;
  padding: 0 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CartProductRightWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
`;

export default CartProductItem;
