import React, { ReactElement, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as T from '../../types';
import { theme } from '../../App.styles';
import Styled from './ProductDetailPage.styles';
import Button from '../../components/shared/Button/Button';
import useAxios from '../../hooks/useAxios';
import API from '../../constants/api';
import { toPriceFormat } from '../../utils';
import useCart from '../../hooks/useCart';

const ProductDetailPage = (): ReactElement => {
  const { id }: { id?: string } = useParams();
  const { add } = useCart();

  const [{ data: product }, fetchProducts] = useAxios(`${API.PRODUCTS}/${id}`);

  const handleAddCartItem = () => {
    add(Number(id));
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <Styled.Root>
      <Styled.Product>
        <Styled.Image src={product?.imageUrl} alt="상품 이미지" />
        <Styled.Title>{product?.name}</Styled.Title>
        <Styled.Line />
        <Styled.Detail>
          <Styled.DetailLabel>금액</Styled.DetailLabel>
          <Styled.DetailValue>{product?.price && toPriceFormat(Number(product.price))}원</Styled.DetailValue>
        </Styled.Detail>
        <Button
          size={T.ButtonSize.LARGE}
          fullWidth
          bgColor={theme.bgColor.darkBrown}
          text="장바구니"
          onClick={handleAddCartItem}
        />
      </Styled.Product>
    </Styled.Root>
  );
};

export default ProductDetailPage;
