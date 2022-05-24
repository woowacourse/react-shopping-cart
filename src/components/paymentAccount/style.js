import styled from 'styled-components';

import StyledButton from 'components/base/button/style';

import { color } from 'constants/constants';

export const PaymentAccountBox = styled.div`
  margin-top: 50px;
  margin-left: 40px;
`;

export const PaymentAccountTitle = styled.div`
  width: 310px;
  height: 70px;
  border: 1px solid #dddddd;
  border-botton: 3px solid #dddddd;
  display: flex;
  align-items: center;
  font-size: 20px;
  padding: 0 20px;
`;

export const PaymentAccountTitleText = styled.p`
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 27px;

  text-align: center;
  letter-spacing: 0.5px;

  height: 8%;
  background-color: ${color.mint};

  display: flex;
  align-items: center;
`;

export const PaymentAccountContent = styled.div`
  width: 310px;
  height: 180px;
  border: 1px solid #dddddd;
  padding: 0 20px;
`;

export const OrderButton = styled(StyledButton)`
  width: 310px;
  padding: 20px;
  font-size: 18px;
  background-color: ${color.mint};
`;
