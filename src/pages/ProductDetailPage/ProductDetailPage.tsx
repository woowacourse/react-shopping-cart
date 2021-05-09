import * as Styled from './ProductDetailPage.styles';

import { useHistory } from 'react-router-dom';
import Button from '../../components/commons/Button/Button';
import NumberInput from '../../components/commons/NumberInput/NumberInput';
import { COLORS } from '../../constants';
import { useSelector } from 'react-redux';
import { RootState } from '../../modules';

const ProductDetailPage = () => {
  const history = useHistory<{ productId: string }>();
  const { products } = useSelector((state: RootState) => state.product);
  const { productId } = history.location.state;
  const product = products.find(product => product.id === productId);

  return (
    <Styled.ProductDetailPage>
      <Styled.ProductWrapper>
        <Styled.ProductImage src={product?.thumbnail} />
        <Styled.ProductNameWrapper>
          <Styled.ProductName>{product?.name}</Styled.ProductName>
          <NumberInput initValue={1} />
        </Styled.ProductNameWrapper>
        <Styled.ProductPriceWrapper>
          <Styled.PriceLabel>금액</Styled.PriceLabel>
          <Styled.ProductPrice>{product?.price}원</Styled.ProductPrice>
        </Styled.ProductPriceWrapper>
        <Button size="LG" backgroundColor={COLORS.BROWN_500}>
          장바구니 담기
        </Button>
      </Styled.ProductWrapper>
    </Styled.ProductDetailPage>
  );
};

export default ProductDetailPage;
