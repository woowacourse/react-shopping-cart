import styled from 'styled-components';

import Button from 'components/base/button/Button';
import StyledText from 'components/base/text/style';

export const Container = styled.div`
  display: flex;
  align-items: flex-start;
`;

export const Box = styled.div`
  display: flex;
  width: 90%;
`;

export const Name = styled(StyledText)`
  padding: 10px;
  width: 280px;
`;

export const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const Quantitybar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const QuantityDisplay = styled.div`
  color: black;
  width: 50px;
  height: 47px;
  border: 1px solid #dddddd;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const QuantityButton = styled(Button)`
  color: black;
  border: 1px solid #dddddd;
  padding: 3px 10px;
`;

export const TotalPrice = styled.p`
  margin-top: 20px;
`;
