import styled from 'styled-components';

import { BasicDivideLine } from 'components/shared/basics';
import CartListContainer from 'components/CartsList/CartListContainer';
import useLoadProducts from 'hooks/useLoadProducts';

function Carts() {
  useLoadProducts();

  return (
    <Style.Container>
      <Style.Header>
        <Style.Title>장바구니</Style.Title>
        <BasicDivideLine weight="bold" mv="20" />
      </Style.Header>
      <CartListContainer />
    </Style.Container>
  );
}

export default Carts;

const Style = {
  Container: styled.section`
    padding: 24px 300px;
  `,
  Header: styled.header`
    display: flex;
    flex-direction: column;
    margin-top: 20px;
  `,
  Title: styled.h2`
    font-size: 24px;
    font-weight: 600;
    text-align: center;
  `,
};
