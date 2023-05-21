import styled from 'styled-components';

export const CartListWrapper = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 80px;
  gap: 80px;
  @media all and (max-width: 479px) {
    gap: 30px;
  }
`;

export const ProductListWrapper = styled.div`
  width: 100vw;
  padding-top: 120px;
  gap: 80px;
`;
