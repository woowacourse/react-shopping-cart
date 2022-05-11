import Header from 'components/Header/Header';
import errorApiImg from 'assets/png/errorApiImg.png';
import emptyImg from 'assets/png/emptyImg.png';
import ProductContainer from 'components/ProductContainer/ProductContainer';
import ProductItem from 'components/ProductItem/ProductItem';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getProductsAsync } from 'reducers/products/products.thunks';
import Skeleton from 'components/Skeleton/Skeleton';
import ImgWrapper from 'components/ImgWrapper/ImgWrapper';

const ProductList = () => {
  const dispatch = useDispatch();
  const { isLoading, data, isError } = useSelector((state) => state.products);

  const isEmpty = !isLoading && data.length === 0;

  useEffect(() => {
    dispatch(getProductsAsync); // {type} 대신에 thunk로 만든 함수를 호출한다.
  }, []);

  useEffect(() => {
    console.log('loading', isLoading);
    console.log('error', isError);
  }, [isError, isLoading]);

  const getLoadingStatus = () => {
    return Array.from({ length: 8 }).map((_, index) => (
      <Skeleton key={index} />
    ));
  };

  return (
    <>
      <Header />
      {isError ? (
        <ImgWrapper src={errorApiImg} />
      ) : isEmpty ? (
        <ImgWrapper src={emptyImg} />
      ) : (
        <ProductContainer>
          {isLoading && getLoadingStatus()}
          {data.map(({ name, price, imgUrl, id }) => (
            <ProductItem name={name} price={price} imgUrl={imgUrl} key={id} />
          ))}
        </ProductContainer>
      )}
    </>
  );
};

export default ProductList;
