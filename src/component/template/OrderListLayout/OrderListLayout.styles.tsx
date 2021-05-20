import styled from '@emotion/styled';

const Container = styled.div`
  width: 100%;
  & > *:not(:last-child) {
    margin-bottom: 75px;
  }
`;

const OrderItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export { Container, OrderItemContainer };
