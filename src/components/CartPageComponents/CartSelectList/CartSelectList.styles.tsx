import styled from 'styled-components';

export const CartSelectListWrapper = styled.div`
  width: 55%;
  margin-top: 34px;

  @media screen and (max-width: 768px) {
    width: 100%;
    margin-top: 20px;
  }
`;

export const CartQuantityText = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 33px;

  @media screen and (max-width: 768px) {
    font-size: 18px;
    line-height: 28px;
  }
`;
