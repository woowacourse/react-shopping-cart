import Header from 'components/Header/Header';
// import { productList } from 'assets/mock';
import ProductContainer from 'components/ProductContainer/ProductContainer';
import ProductItem from 'components/ProductItem/ProductItem';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getProductsAsync } from 'reducers/products/products.thunks';

const ProductList = () => {
  const dispatch = useDispatch();
  const { isLoading, data, isError } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProductsAsync); // {type} 대신에 thunk로 만든 함수를 호출한다.
  }, []);

  useEffect(() => {
    console.log('loading', isLoading);
    console.log('error', isError);
  }, [isError, isLoading]);

  return (
    <>
      <Header />
      <ProductContainer>
        {data.map(({ name, price, imgUrl, id }) => (
          <ProductItem name={name} price={price} imgUrl={imgUrl} key={id} />
        ))}
      </ProductContainer>
    </>
  );
};

export default ProductList;
