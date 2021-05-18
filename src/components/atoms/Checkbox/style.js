import styled from 'styled-components';
import { COLOR } from '../../../constants';

export const Container = styled.label`
  display: inline-block;
  position: relative;
  min-height: 1.75rem;
  padding-left: 2.5rem;
  line-height: 2rem;
  font-size: 1rem;
  cursor: pointer;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  color: ${COLOR.HEX.GRAY_800};
`;

export const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
`;

export const CheckMark = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 1.75rem;
  width: 1.75rem;
  border-radius: 0.125rem;
  background-color: ${COLOR.HEX.WHITE};

  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border: 0.0625rem solid ${COLOR.HEX.CYAN_700};
    box-sizing: border-box;
    border-radius: 0.125rem;
  }

  &:after {
    content: '';
    position: absolute;
    display: none;
    top: 0.1rem;
    left: 0.6rem;
    width: 0.375rem;
    height: 1rem;
    border: solid ${COLOR.HEX.WHITE};
    border-width: 0 0.2rem 0.2rem 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }

  ${Checkbox}:checked + & {
    background-color: ${COLOR.HEX.CYAN_700};

    &:after {
      display: block;
    }
  }
`;
