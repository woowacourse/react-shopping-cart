import { Image as ProductImage } from './common/Image';
import { CheckBox } from './common/CheckBox';
import { styled } from 'styled-components';
import { StyledText } from './common/Text';
import { DeleteProductButtonImage } from '../types/image';
import { AddToCartCount } from './AddToCartCount';

export const CartProductItem = () => {
  return (
    <CartProductItemContainer>
      <LeftSideWrapper>
        <CheckBox />
        <ProductImage source="/assets/1.png" alternative="상품 이미지" />
        <ProductTitle size="20px" weight="600">
          [든든] 야채바삭 김말이 700g
        </ProductTitle>
      </LeftSideWrapper>

      <RightSideWrapper>
        <DeleteProductButtonImage />
        <AddToCartCount id={2} quantity={2} />
        <ProductPrice size="18px" weight="600">
          7,600원
        </ProductPrice>
      </RightSideWrapper>
    </CartProductItemContainer>
  );
};

const CartProductItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 30px 0;
`;

const LeftSideWrapper = styled.div`
  display: flex;

  & > :nth-child(1) {
    margin-right: 30px;
  }
`;

const ProductTitle = styled(StyledText)`
  margin: 2px 0 10px 30px;
`;

const ProductPrice = styled(StyledText)`
  margin: 0 0 10px 0;
`;

const RightSideWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: center;

  & > :nth-child(1) {
    margin: 5px 0 20px 0;
  }

  & > :nth-child(2) {
    margin: 0 0 30px 0;
  }

  & > :nth-child(3) {
    margin: 0 0 15px 0;
  }
`;
