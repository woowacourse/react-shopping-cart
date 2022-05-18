import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import API_URL from '../../constants/api';
import PATH from '../../constants/path';
import useFetch from '../../hooks/useFetch';
import { loadProduct } from '../../store/product';
import ProductDetail from './ProductDetail';

function ProductDetailContainer() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { isLoading, product, error } = useSelector((state) => state.product);
  const {
    isLoading: isCartLoading,
    result: cart,
    error: cartError,
    apiCall: loadCart,
  } = useFetch({
    url: `${API_URL}/${PATH.CARTS}/${id}`,
  });

  useEffect(() => {
    loadCart();
    dispatch(loadProduct(id));
  }, []);

  return (
    <Style.ProductDetailContainer>
      {isLoading && <h1>로딩 중...</h1>}
      {!isLoading && (
        <ProductDetail
          id={id}
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
