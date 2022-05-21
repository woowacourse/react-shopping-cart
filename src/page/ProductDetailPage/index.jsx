import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { Button, Image } from 'components';

import Styled from 'page/ProductDetailPage/index.style';
import { SERVER_URL } from 'constants';
import Line from 'components/Line';
import theme from 'components/theme';
import autoComma from 'utils/autoComma';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const getProductDetail = useCallback(async () => {
    const response = await axios.get(SERVER_URL + `products/${id}`);

    setProduct(response.data);
  }, [id]);

  useEffect(() => {
    getProductDetail();
  }, [getProductDetail]);

  return (
    <Styled.ProductDetailPage>
      {product && (
        <Styled.ProductContainer>
          <Image src={product.image} size="570px" />
          <Styled.ProductName>{product.name}</Styled.ProductName>
          <Line margin="33px 0" />
          <Styled.PriceContainer>
            <Styled.PriceTag>금액</Styled.PriceTag>
            <Styled.ProductPrice>{autoComma(product.price)}</Styled.ProductPrice>
          </Styled.PriceContainer>
          <Button
            bg={theme.colors.brown}
            width="638px"
            height="98px"
            style={{ fontWeight: 700, fontSize: '32px', lineHeight: '21px', marginTop: '57px' }}
          >
            장바구니
          </Button>
        </Styled.ProductContainer>
      )}
    </Styled.ProductDetailPage>
  );
};

export default ProductDetailPage;
