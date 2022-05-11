import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import ProductDetail from 'components/ProductDetail/ProductDetail';
import { getProductAsync } from 'reducers/product/product.thunks';
import Skeleton from 'components/Skeleton/Skeleton';
import ErrorApi from 'components/ErrorApi/ErrorApi';

const Product = () => {
  const dispatch = useDispatch();
  const { isLoading, data, isError } = useSelector((state) => state.product);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getProductAsync(id));
  }, [id]);

  return (
    <Styled.Wrapper>
      {isLoading && <Skeleton sizeType="large" />}
      {isError && <ErrorApi />}
      {!isLoading && data && (
        <ProductDetail
          imgUrl={data.imgUrl}
          name={data.name}
          price={data.price}
          id={data.id}
        />
      )}
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 50px;
  `,
};

export default Product;
