import styled from '@emotion/styled';
// import { CartIcon } from '../../assets';
import { useState } from 'react';
import type { Product } from '../../types/types';
import { Text } from '../common/Text/Text';
import InputStepper from '../common/InputStepper/InputStepper';

const ProductItem = ({ product }: { product: Product }) => {
  const [quantity, setQuantity] = useState<number>(1);

  return (
    <ProductWrapper>
      <ProductImage src={product.imageUrl} alt={product.name} />
      <ProductInfoWrapper>
        <ProductTextWrapper>
          <Text size="smallest" weight="light" color="#333333">
            {product.name}
          </Text>
          <Text size="small" weight="light" color="#333333" lineHeight="33px">
            {product.price} 원
          </Text>
        </ProductTextWrapper>
        <InputStepper size="small" quantity={quantity} setQuantity={(value) => setQuantity(value)}/>
        {/* <CartIcon width={25} height={22} fill="#AAAAAA" style={{ transform: 'scaleX(-1)' }} /> */}
      </ProductInfoWrapper>
    </ProductWrapper>
  );
};

export default ProductItem;

const ProductWrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 282px;
`;
const ProductImage = styled.img`
  width: 100%;
  height: 282px;
`;

const ProductInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;
  padding: 12px;
`;

const ProductTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
