import { StyledText } from './common/Text';
import { Image as ProductImage } from './common/Image';
import { AddToCartButton } from './AddToCartButton';
import { ProductItem as ProductItemProps } from '../types/productType';
import { useCartState } from './hooks/useCartState';
import styled from 'styled-components';

export const ProductItem = (props: ProductItemProps) => {
  const { id, name, price, imageUrl } = props;

  const { addToCartState } = useCartState(props);

  return (
    <ProductItemWrapper key={id}>
      <ProductImage
        $width="282px"
        $height="282px"
        source={imageUrl}
        alternative="상품 이미지"
      />
      <ProductTextWrapper>
        <div>
          <ProductTitle size="16px" weight="600">
            {name}
          </ProductTitle>
          <ProductPrice size="20px" weight="600">
            {`${price.toLocaleString('ko-KR')} 원`}
          </ProductPrice>
        </div>
        <AddToCartButton id={id} addToCartState={addToCartState} />
      </ProductTextWrapper>
    </ProductItemWrapper>
  );
};

const ProductItemWrapper = styled.div`
  margin-bottom: 20px;
`;

const ProductTextWrapper = styled.div`
  width: 282px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 10px 10px 10px;
`;

const ProductTitle = styled(StyledText)`
  margin: 0 0 10px 0;
`;
const ProductPrice = styled(StyledText)`
  margin: 0 0 6px 0;
`;
