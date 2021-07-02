import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import * as T from 'types';
import Button from 'components/shared/Button/Button';
import useAxios from 'hooks/useAxios';
import API from 'constants/api';
import { toPriceFormat } from 'utils';
import useCart from 'hooks/useCart';
import useImageFallback from 'hooks/useImageFallback';
import { theme } from 'App.styles';
import { useSnackbar } from 'notistack';
import Styled from './ProductDetailPage.styles';

interface LocationState {
  product: T.Product;
}

interface Params {
  id: string;
}

const ProductDetailPage = (): ReactElement => {
  const location = useLocation<LocationState>();
  const { id } = useParams<Params>();
  const { addItem } = useCart();
  const { enqueueSnackbar } = useSnackbar();

  const [product, setProduct] = useState<T.Product>(location.state?.product);
  const { imageUrl: currentImageUrl, setImageUrl, onImageLoadError } = useImageFallback(
    location.state?.product?.imageUrl
  );

  const [{ data, error }, fetch] = useAxios<T.Product>(`${API.PRODUCTS}/${id}`);

  const handleAddCartItem = () => {
    addItem(Number(id));
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
    if (error) {
      enqueueSnackbar(data);
    }
  }, [data, enqueueSnackbar, error]);

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
