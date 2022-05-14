import errorApiImg from 'assets/png/errorApiImg.png';
import emptyImg from 'assets/png/emptyImg.png';
import ProductContainer from 'components/ProductContainer/ProductContainer';
import ProductItem from 'components/ProductItem/ProductItem';
import { useEffect } from 'react';
import { getProductsAsync } from 'reducers/products/products.thunks';
import SkeletonList from 'components/SkeletonList';
import ImgWrapper from 'components/ImgWrapper/ImgWrapper';
import useReduxState from 'hooks/useReduxState';

const ProductList = () => {
  const { dispatch, isLoading, data, isError } = useReduxState('products');
  const isEmpty = !isLoading && data.length === 0;

  useEffect(() => {
    if (data.length > 0) return;
    dispatch(getProductsAsync);
  }, [data]);

  return (
    <>
      {isError ? (
        <ImgWrapper src={errorApiImg} />
      ) : isEmpty ? (
        <ImgWrapper src={emptyImg} />
      ) : (
        <ProductContainer>
          {isLoading && <SkeletonList length={8} />}
          {data.map(({ name, price, imgUrl, id }) => (
            <ProductItem
              id={id}
              name={name}
              price={price}
              imgUrl={imgUrl}
              key={id}
            />
          ))}
        </ProductContainer>
      )}
    </>
  );
};

export default ProductList;
