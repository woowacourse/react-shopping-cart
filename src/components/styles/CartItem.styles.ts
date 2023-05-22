import styled from 'styled-components';
import { Paragraph } from '../../ui/styles/Typography.styles';
import { Input } from '../../ui/styles/Input.styles';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  width: 660px;
  height: 180px;
  border-bottom: 1px solid #aaaaaa;

  @media screen and (max-width: 1120px) {
    max-width: 660px;
    width: 100%;
  }
`;

export const CheckboxInput = styled(Input)`
  width: 20px;
  height: 20px;
  margin: auto 16px;

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

export const DeleteCartButtonWrapper = styled.div`
  cursor: pointer;
`;

export const ProductName = styled(Paragraph)`
  width: 344px;
  margin: 16px 0 0 16px;
`;

export const CountInteractionWrapper = styled.div`
  width: 100px;
  height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: end;
`;
