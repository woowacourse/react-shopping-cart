import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Styled from './style';

import ProductDetail from 'components/ProductDetail/ProductDetail';
import { getProductAsync } from 'reducers/product/product.thunks';
import Skeleton from 'components/Skeleton/Skeleton';
import errorApiImg from 'assets/png/errorApiImg.png';
import useReduxState from 'hooks/useReduxState';
import ImgWrapper from 'components/ImgWrapper/ImgWrapper';
import { addCartItem } from 'reducers/cart/cart.actions';

const Product = () => {
  const { dispatch, isLoading, data, isError } = useReduxState('product');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProductAsync(id));
  }, [id]);

  const handleClickCartButton = () => {
    dispatch(addCartItem({ ...data, quantity: 1 }));
    navigate('/cart');
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
          onClick={handleClickCartButton}
        />
      )}
    </Styled.Wrapper>
  );
};

export default Product;
