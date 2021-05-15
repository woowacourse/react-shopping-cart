import { useEffect, useState } from 'react';
import noImagePNG from '../assets/images/no-image.png';
import { parseProductData } from '../utils/parseData';
import { requestGetProduct } from '../apis/products';

const defaultProduct: Product = {
  id: '0',
  name: '상품 정보 없음',
  price: '0',
  thumbnail: noImagePNG,
};

const useProductDetail = () => {
  const [product, setProduct] = useState<Product>(defaultProduct);
  const [loading, setLoading] = useState<boolean>(true);
  const [responseOK, setResponseOK] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [productId] = window.location.hash.split('/').slice(-1);
        const response = await requestGetProduct(productId);
        setProduct(parseProductData(response.data));
        setResponseOK(true);
      } catch (error) {
        console.error(error);
        setResponseOK(false);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { product, loading, responseOK };
};

export default useProductDetail;
