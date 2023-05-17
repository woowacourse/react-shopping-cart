import styled from 'styled-components';
import { Button } from '../../ui/styles/Button.styles';

export const Wrapper = styled.div`
  width: 80px;
  height: 44px;
  border: 1px solid #dddddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const QuantityText = styled.div`
  width: 68px;
  text-align: center;
`;

export const DecreaseCountButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  cursor: pointer;
  border: none;
  border-left: 1px solid #dddddd;
  background-color: transparent;
`;

export const IncreaseCountButton = styled(DecreaseCountButton)`
  border-bottom: 1px solid #dddddd;
`;
