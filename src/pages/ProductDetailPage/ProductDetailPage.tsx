import * as Styled from './ProductDetailPage.styles';

import Button from '../../components/commons/Button/Button';
import NumberInput from '../../components/commons/NumberInput/NumberInput';
import { COLORS } from '../../constants';

const ProductDetailPage = () => {
  return (
    <Styled.ProductDetailPage>
      <Styled.ProductWrapper>
        <Styled.ProductImage />
        <Styled.ProductNameWrapper>
          <Styled.ProductName>{`[든든] 동동 스위트콘`}</Styled.ProductName>
          <NumberInput initValue={1} />
        </Styled.ProductNameWrapper>
        <Styled.ProductPriceWrapper>
          <Styled.PriceLabel>금액</Styled.PriceLabel>
          <Styled.ProductPrice>99,800원</Styled.ProductPrice>
        </Styled.ProductPriceWrapper>
        <Button size="LG" backgroundColor={COLORS.BROWN_500}>
          장바구니 담기
        </Button>
      </Styled.ProductWrapper>
    </Styled.ProductDetailPage>
  );
};

export default ProductDetailPage;
