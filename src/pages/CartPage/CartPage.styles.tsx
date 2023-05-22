import styled from 'styled-components';

export const CartPageContainer = styled.div`
  width: 100%;
  height: calc(100vh - 80px);
  padding: 50px 0;

  @media screen and (max-width: 768px) {
    padding: 30px 0;
  }
`;

export const CartMainText = styled.h1`
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 37px;
  text-align: center;
  color: var(--color-brownish-red);

  @media screen and (max-width: 768px) {
    font-size: 28px;
  }
`;

export const MainTextBorder = styled.hr`
  width: 100%;
  border: 1px solid var(--color-black);
  margin-top: 29px;
  margin-bottom: 50px;

  @media screen and (max-width: 768px) {
    margin-top: 15px;
    margin-bottom: 30px;
  }
`;

export const CartSelectListContainer = styled.div`
  width: 100%;
  display: flex;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;
