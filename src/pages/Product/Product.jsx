import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import ProductDetail from 'components/ProductDetail/ProductDetail';
import { getProductAsync } from 'reducers/product/product.thunks';
import Skeleton from 'components/Skeleton/Skeleton';
import errorApiImg from 'assets/png/errorApiImg.png';
import useReduxState from 'hooks/useReduxState';
import ImgWrapper from 'components/ImgWrapper/ImgWrapper';
import { addCartItem } from 'reducers/cart/cart.actions';
import { PATH } from 'constants/path';

const Product = () => {
  const { dispatch, isLoading, data, isError } = useReduxState('product');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProductAsync(id));
  }, [id]);

  const onClickCartButton = () => {
    dispatch(addCartItem({ ...data, quantity: 1 }));
    navigate(PATH.CART);
  };

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
          onClick={onClickCartButton}
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
