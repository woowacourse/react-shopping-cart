import {
  CartProductState,
  CartStoreState,
  Product,
  ProductStoreState,
} from 'types/index';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import CONDITION from 'constants/condition';
import CartContent from 'components/CartContent/CartContent';
import { getProducts } from 'redux/thunks';
import styled from 'styled-components';

function CartPage() {
  const condition = useSelector(
    (state: { product: ProductStoreState }) => state.product.condition
  );
  const productList = useSelector(
    (state: { product: ProductStoreState }) => state.product.productList
  );
  const cart = useSelector(
    (state: { cart: CartStoreState }) => state.cart.cart
  );
  const [cartItems, setCartItems] = useState<Array<CartProductState>>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (productList.length < 1) {
      getProducts(dispatch);
    }
  }, [dispatch, productList.length]);

  useEffect(() => {
    if (productList.length < 1) return;

    setCartItems(
      cart.map(({ id, stock, checked }) => {
        const item = productList.find(
          (product) => product.id === id
        ) as Product;

        return { product: item, stock, checked };
      })
    );
  }, [cart, productList]);

  const renderSwitch = () => {
    switch (condition) {
      case CONDITION.LOADING:
        return <Message>Loading...</Message>;
      case CONDITION.COMPLETE:
        return <CartContent cartItems={cartItems} />;
      case CONDITION.ERROR:
        return (
          <Message>상품 정보를 가져오는데 오류가 발생하였습니다 😱</Message>
        );
    }
  };

  return (
    <StyledPage>
      <h2>장바구니</h2>
      <hr />
      {renderSwitch()}
    </StyledPage>
  );
}

const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 800px;
  margin: 50px auto;

  h2 {
    margin-bottom: 20px;

    font-size: 20px;
    font-weight: 900;
  }

  hr {
    width: 100%;
  }
`;

const Message = styled.div`
  margin-top: 20px;

  font-size: 25px;
`;

export default CartPage;
