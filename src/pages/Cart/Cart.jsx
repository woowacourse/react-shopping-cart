import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCartAsync } from 'reducers/cart/cart.thunks';
import styled from 'styled-components';

const Cart = () => {
  const dispatch = useDispatch();
  const { isLoading, data, isError } = useSelector((state) => state.cart);
  // id는 'crew1' 대신에 추후에 매개변수로 받아온다.
  useEffect(() => {
    dispatch(getCartAsync('crew1'));
  });

  useEffect(() => {
    console.log('@@@', data);
  }, [data]);

  return (
    <Styled.Wrapper>
      <div>isLoading: {isLoading}</div>
      <div>isError: {isError}</div>
      <div>data: {data}</div>
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

export default Cart;
