import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UNIT } from '../../../constants/appInfo';
import PALETTE from '../../../constants/palette';
import { reactFamily } from '../../../mockData';
import { getProducts, resetProducts } from '../../../redux/ProductList/actions';
import ShoppingCart from '../../common/Icon/ShoppingCart';
import Main from '../../Main';
import Product from '../../shared/Product';
import * as Styled from './style';

const ProductListPage = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts(reactFamily));

    return () => {
      dispatch(resetProducts());
    };
  }, []);

  return (
    <Main>
      <Styled.ProductList>
        {products.map((product) => (
          <li key={product.id}>
            <Product
              product={product}
              productDetail={{
                text: `${product.price.toLocaleString()} ${UNIT.MONEY}`,
                fontSize: '1.5rem',
              }}
              direction="column"
              size="17.5rem"
            >
              <Styled.CartButton>
                <ShoppingCart width="2rem" color={PALETTE.BLACK} />
              </Styled.CartButton>
            </Product>
          </li>
        ))}
      </Styled.ProductList>
    </Main>
  );
};

export default ProductListPage;
