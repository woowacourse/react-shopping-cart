import styled from 'styled-components';
import { Button } from '../../';
import { COLOR } from '../../../constants';

export const Container = styled.div`
  display: flex;
  width: 7rem;
  height: 3.75rem;
`;

export const Input = styled.input`
  width: 64%;
  border-color: ${COLOR.HEX.GRAY_200};
  border-width: 0.125rem 0 0.125rem 0.125rem;
  border-style: solid;
  text-align: center;
  font-size: 1.5rem;
  color: ${COLOR.HEX.GRAY_800};

  -moz-appearance: textfield;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const Controller = styled.div`
  width: 36%;
`;

export const StepperButton = styled(Button)`
  width: 100%;
  height: 50%;
  border-color: ${COLOR.HEX.GRAY_200};
  border-width: ${(props) => (props.isUpward ? '0.125rem 0.125rem 0 0.125rem' : '0.125rem')};
  border-style: solid;
`;
