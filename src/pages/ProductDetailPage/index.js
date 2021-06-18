import { useParams } from 'react-router';
import { useCartDispatch, useRequest } from '../../hooks';
import { Line } from '../../components';
import { getFormattedAsKRW } from '../../utils';
import * as S from './style.js';
import { useEffect, useState } from 'react';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { getProduct } = useRequest();
  const { addProduct } = useCartDispatch();

  useEffect(() => {
    (async () => {
      const response = await getProduct(id);

      setProduct(response);
    })();
  }, [id, getProduct]);

  return (
    <S.Page>
      {product && (
        <S.Container>
          <S.Image src={product.img} />
          <S.Footer>
            <S.Name>{product.name}</S.Name>
            <Line color="#BBBBBB" />
            <S.Price>
              <span>금액</span>
              <span>{getFormattedAsKRW(product.price)}</span>
            </S.Price>
            <S.AddToCartButton onClick={() => addProduct(product)}>장바구니</S.AddToCartButton>
          </S.Footer>
        </S.Container>
      )}
    </S.Page>
  );
};
