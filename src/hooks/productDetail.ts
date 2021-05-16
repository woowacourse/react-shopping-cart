import { useState } from 'react';
import noImagePNG from '../assets/images/no-image.png';
import { parseProductData } from '../utils/parseData';
import { requestGetProduct } from '../apis/products';
import { Product } from '../type';
import useRequest from './request';

const defaultProduct: Product = {
  id: '0',
  name: '상품 정보 없음',
  price: '0',
  thumbnail: noImagePNG,
};

const useProductDetail = () => {
  const [product, setProduct] = useState<Product>(defaultProduct);

  const { loading, responseOK } = useRequest(async () => {
    const [productId] = window.location.hash.split('/').slice(-1);
    const response = await requestGetProduct(productId);
    setProduct(parseProductData(response.data));
  });

  return { product, loading, responseOK };
};

export default useProductDetail;
