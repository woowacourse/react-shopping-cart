import axios from 'axios';
import { useEffect, useState } from 'react';
import { STATUS_CODE, URL } from '../constants';
import noImagePNG from '../assets/images/no-image.png';
import useFetchingStatus from './useFetchingStatus';

const defaultProduct: Product = {
  id: '0',
  name: '상품 정보 없음',
  price: '0',
  thumbnail: noImagePNG,
  stock: 0,
};

const useProductDetail = () => {
  const [product, setProduct] = useState<Product>(defaultProduct);
  const { loading, setLoading, responseOK, setResponseOK } = useFetchingStatus();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const productId = window.location.hash.split('/').slice(-1);
        const response = await axios.get(`${URL.PRODUCTS}/${productId}`);
        if (response.status !== STATUS_CODE.GET_SUCCESS) {
          throw new Error('상품 상세 정보 조회 실패');
        }
        setProduct(response.data);
        setResponseOK(true);
      } catch (error) {
        console.error(error);
        setResponseOK(false);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [setLoading, setResponseOK]);

  return { product, loading, responseOK };
};

export default useProductDetail;
