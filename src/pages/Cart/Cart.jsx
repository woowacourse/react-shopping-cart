import { useSelector } from 'react-redux';

import styled from 'styled-components';

const Cart = () => {
  const { data } = useSelector((state) => state.cart);

  return (
    <Styled.Wrapper>
      {data.map(({ name, quantity, price, id }) => (
        <div key={id}>
          상품명 : {name} /
          <span>
            {quantity}개 {price}원
          </span>
        </div>
      ))}
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
