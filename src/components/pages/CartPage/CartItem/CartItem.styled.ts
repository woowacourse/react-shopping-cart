import styled from 'styled-components';

export const CartItemDiv = styled.div`
  display: flex;
  justify-content: space-between;

  max-width: 735px;

  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  text-align: right;
  letter-spacing: 0.5px;
`;

export const NameDiv = styled.div`
  display: flex;

  column-gap: 15px;

  & > p {
    max-width: 400px;

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

export const CountDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
`;
