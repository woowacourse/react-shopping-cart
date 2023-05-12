import { Text as ProductPrice, StyledParagraph } from './common/Text';
import { Image as ProductImage } from './common/Image';
import { AddToCartButton } from './AddToCartButton';
import { ProductItem as ProductItemProps } from '../types/productType';
import { useCartState } from './hooks/useCartState';
import styled from 'styled-components';

export const ProductItem = (props: ProductItemProps) => {
  const { id, name, price, imageUrl } = props;

  const { handleAddCartState, handleDeleteCartState } = useCartState(props);

  return (
    <Wrapper key={id}>
      <ProductImage
        $width={'282px'}
        $height={'282px'}
        src={imageUrl}
        alt="상품 이미지"
      />
      <ProductInfoWrapper>
        <div>
          <ProductTitle size="16px">{name}</ProductTitle>
          <ProductPrice size="20px">
            {`${price.toLocaleString('ko-KR')} 원`}
          </ProductPrice>
        </div>
        <AddToCartButton
          id={id}
          handleAddCartState={handleAddCartState}
          handleDeleteCartState={handleDeleteCartState}
        />
      </ProductInfoWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 352px;
  margin-bottom: 20px;
`;

const ProductInfoWrapper = styled.div`
  width: 282px;
  display: flex;
  justify-content: space-between;
  margin-top: 8px;

  > div:nth-child(1) {
    width: 200px;
  }
`;

const ProductTitle = styled(StyledParagraph)`
  margin-bottom: 8px;
`;
