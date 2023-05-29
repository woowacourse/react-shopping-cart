import { styled } from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  max-width: 448px;
  height: 410px;
  border: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  margin-top: 50px;

  @media screen and (max-width: 992px) {
    max-width: 100%;
  }
`;

export const Title = styled.h3`
  flex: 0 0 81px;
  display: flex;
  align-items: center;
  padding-left: 30px;
  border-bottom: 3px solid #ddd;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 33px;

  letter-spacing: 0.5px;
`;

export const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 38px 30px;
`;

export const OrderButton = styled.button`
  width: 100%;
  height: 73px;
  background-color: #333;
  color: #fff;
  font-weight: 400;
  font-size: 20px;
  line-height: 21px;
  cursor: pointer;
`;

export const PriceInfoWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 19px;
`;

export const PriceInfo = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 6px;
  justify-content: space-between;
  font-weight: 700;
  font-size: 16px;
  line-height: 27px;
  letter-spacing: 0.5px;
  color: #333333;
`;
