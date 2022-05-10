import Header from 'components/Header/Header';
import { productList } from 'assets/mock';
import ProductContainer from 'components/ProductContainer/ProductContainer';
import ProductItem from 'components/ProductItem/ProductItem';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const ProductList = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch({ type: 'GET_PRODUCTS' });
  }, []);

  useEffect(() => {
    console.log(loading);
  }, [loading]);
  return (
    <>
      <Header />
      <ProductContainer>
        {productList.map(({ name, price, imgUrl, id }) => (
          <ProductItem name={name} price={price} imgUrl={imgUrl} key={id} />
        ))}
      </ProductContainer>
    </>
  );
};

export default ProductList;
