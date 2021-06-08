import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import * as T from '../../types';
import { theme } from '../../App.styles';
import Styled from './ProductDetailPage.styles';
import Button from '../../components/shared/Button/Button';
import useAxios from '../../hooks/useAxios';
import API from '../../constants/api';
import { toPriceFormat } from '../../utils';
import useCart from '../../hooks/useCart';
import useImageFallback from '../../hooks/useImageFallback';

interface LocationState {
  product: T.Product;
}

const ProductDetailPage = (): ReactElement => {
  const location = useLocation<LocationState>();
  const { id }: { id?: string } = useParams();
  const { onAdd } = useCart();

  const [product, setProduct] = useState<T.Product>(location.state?.product);
  const { imageUrl: currentImageUrl, setImageUrl, onImageLoadError } = useImageFallback(
    location.state?.product?.imageUrl
  );

  const [{ data }, fetch] = useAxios(`${API.PRODUCTS}/${id}`);

  const handleAddCartItem = () => {
    onAdd(Number(id));
  };

  const fetchProduct = useCallback(async () => {
    if (!data) {
      await fetch();
    }

    if (data) {
      setProduct(data);
      setImageUrl(data.imageUrl);
    }
  }, [data, fetch, setImageUrl]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return (
    <Styled.Root>
      {product && (
        <Styled.Product>
          <Styled.Image src={currentImageUrl} alt="상품 이미지" onError={onImageLoadError} />
          <Styled.Title>{product?.name}</Styled.Title>
          <Styled.Line />
          <Styled.Detail>
            <Styled.DetailLabel>금액</Styled.DetailLabel>
            <Styled.DetailValue>{product?.price && toPriceFormat(Number(product?.price))}원</Styled.DetailValue>
          </Styled.Detail>
          <Button
            size={T.ButtonSize.LARGE}
            fullWidth
            bgColor={theme.bgColor.darkBrown}
            text="장바구니"
            onClick={handleAddCartItem}
          />
        </Styled.Product>
      )}
    </Styled.Root>
  );
};

export default ProductDetailPage;
