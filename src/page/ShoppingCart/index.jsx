import styled from 'styled-components';
import cookieStorage from 'storage/cookieStorage';
import CartOperator from 'component/ShoppingCart/CartOperator';
import CartOrder from 'component/ShoppingCart/CartOrder';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { cartProductsAsyncThunk } from 'store/thunk/productThunk';

export default function ShoppingCart() {
  const dispatch = useDispatch();
  const cartedProducts = useSelector(store => store.shoppingCart);

  useEffect(() => {
    const idList = cookieStorage.getCartProductIds();
    if (cartedProducts.length === 0 && idList) {
      dispatch(cartProductsAsyncThunk(idList));
    }
  }, []);

  return (
    <Styled.Page>
      <Styled.Content>
        <Styled.Head>장바구니</Styled.Head>
        <Styled.BodyBox>
          <Styled.CartOperationWrapper>
            <CartOperator products={cartedProducts} />
          </Styled.CartOperationWrapper>
          <Styled.OrderContainerWrapper>
            <CartOrder products={cartedProducts} />
          </Styled.OrderContainerWrapper>
        </Styled.BodyBox>
      </Styled.Content>
    </Styled.Page>
  );
}

const Styled = {
  Page: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  Content: styled.div`
    width: 1320px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 58px;
  `,

  Head: styled.p`
    width: 100%;
    height: 30px;
    padding-bottom: 29px;
    border-bottom: 4px solid black;

    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    line-height: 37px;

    text-align: center;
    letter-spacing: 0.5px;
  `,

  BodyBox: styled.div`
    display: flex;
    padding: 0 30px;
    justify-content: space-between;
  `,

  CartOperationWrapper: styled.div`
    margin-top: 53px;
  `,

  OrderContainerWrapper: styled.div`
    margin-top: 103px;
  `,
};
