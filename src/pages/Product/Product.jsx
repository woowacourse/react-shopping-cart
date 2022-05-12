import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import ProductDetail from 'components/ProductDetail/ProductDetail';
import { getProductAsync } from 'reducers/product/product.thunks';
import Skeleton from 'components/Skeleton/Skeleton';
import errorApiImg from 'assets/png/errorApiImg.png';
import useReduxState from 'hooks/useReduxState';
import ImgWrapper from 'components/ImgWrapper/ImgWrapper';

const Product = () => {
  const { dispatch, isLoading, data, isError } = useReduxState('product');
  const { id } = useParams();

  useEffect(() => {
    dispatch(getProductAsync(id));
  }, [id]);

  return (
    <Styled.Wrapper>
      {isLoading && <Skeleton sizeType="large" />}
      {isError && <ImgWrapper src={errorApiImg} />}
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
