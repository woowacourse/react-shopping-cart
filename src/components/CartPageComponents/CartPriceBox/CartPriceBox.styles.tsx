import styled from 'styled-components';

export const CartPriceBoxWrapper = styled.div`
  width: 45%;
  margin-top: 83px;
  margin-left: 100px;

  @media screen and (max-width: 768px) {
    width: 100%;
    margin: 30px 0;
  }
`;

export const CartPriceBoxContent = styled.div`
  position: fixed;
  width: 26%;
  border: 2px solid #dddddd;

  @media screen and (max-width: 768px) {
    width: 100%;
    position: static;
    border: none;
    padding: 0 20px;
  }
`;

export const CartPriceBoxContentTitle = styled.h3`
  font-weight: 400;
  font-size: 24px;
  line-height: 33px;
  letter-spacing: 0.5px;
  padding: 35px 0 35px 30px;

  @media screen and (max-width: 768px) {
    padding: 20px 0;
    text-align: center;
  }
`;

export const CartPriceTextWrapper = styled.div`
  padding: 35px 30px;

  @media screen and (max-width: 768px) {
    padding: 20px 0;
  }
`;

export const PriceTextWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const CartPriceBoxDivider = styled.hr`
  border: 2px solid #dddddd;
`;

export const CartPriceText = styled.span`
  font-weight: 700;
  font-size: 20px;
  line-height: 27px;
  margin-bottom: 19px;
`;

export const OrderButton = styled.button`
  width: 100%;
  height: 59px;
  border: none;
  background-color: var(--color-header);
  transition: transform 0.1s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: scale(1.03);
  }

  @media screen and (max-width: 768px) {
    height: 50px;
  }
`;
