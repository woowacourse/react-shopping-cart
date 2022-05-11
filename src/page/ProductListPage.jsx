import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import store from 'app/store';
import ProductItem from 'components/ProductItem';
import { INITIALIZE } from 'modules/reducer';
import { SERVER_URL } from 'constants';

const StyledProductListPage = styled.main`
  width: 1269px;
  background-color: white;
  margin-top: 140px;
  padding: 40px;
  overflow: scroll;
  height: 100%;

  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const StyledProductList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 47px;
`;

const ProductListPage = () => {
  const { products, shoppingCart } = useSelector(state => state.reducer);

  const getProducts = async () => {
    const response = await axios.get(SERVER_URL + 'products');

    store.dispatch({ type: INITIALIZE, products: response.data });
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    console.log(products);
    console.log(shoppingCart);
  }, [products, shoppingCart]);

  return (
    <StyledProductListPage>
      <StyledProductList>
        {products.map(({ id }) => (
          <ProductItem key={id} id={id} />
        ))}
      </StyledProductList>
    </StyledProductListPage>
  );
};

export default ProductListPage;
