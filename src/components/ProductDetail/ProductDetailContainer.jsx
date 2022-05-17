import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { loadProduct } from '../../store/product';
import ProductDetail from './ProductDetail';

const useFetch = (url) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const apiCall = async () => {
    setIsLoading(true);

    try {
      const result = await axios.get(url);
      setData(result.data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    apiCall();
  }, []);

  return [isLoading, data, error];
};

function ProductDetailContainer() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { isLoading, product, error } = useSelector((state) => state.product);
  const [isCartLoading, cart, cartError] = useFetch(
    `${process.env.REACT_APP_SERVER_URL}/carts/${id}`
  );

  useEffect(() => {
    dispatch(loadProduct(id));
  }, []);

  return (
    <Style.ProductDetailContainer>
      {isLoading && <h1>로딩 중...</h1>}
      {!isLoading && (
        <ProductDetail
          src={product?.src}
          title={product?.title}
          price={product?.price}
          isStored={cart !== null}
        />
      )}
    </Style.ProductDetailContainer>
  );
}

export default ProductDetailContainer;

const Style = {
  ProductDetailContainer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    margin-top: 50px;
  `,
};
