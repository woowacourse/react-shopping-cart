import styled from 'styled-components';
import { Paragraph } from '../../ui/styles/Typography.styles';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  width: 660px;
  height: 180px;
`;

export const CheckboxInput = styled.input`
  width: 20px;
  height: 20px;
  margin: 16px 16px 0 0;

  &::after {
    content: '';
    position: relative;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border: 1px solid #04c09e;
    border-radius: 2px;
  }
`;

export const ProductName = styled(Paragraph)`
  width: 380px;
  margin: 16px 0 0 16px;
`;

export const CountInteractionWrapper = styled.div`
  height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: end;
`;
