import styled from 'styled-components';

export const OrderList = styled.div`
  border: 1px solid var(--color-grey-200);
  margin-bottom: 1rem;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid var(--color-grey-200);
  background-color: var(--color-light-grey);

  span {
    margin: 1rem 2rem;
  }

  :hover {
    border-bottom: 1px solid var(--color-grey-500);
  }
`;
