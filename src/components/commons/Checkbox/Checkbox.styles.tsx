import styled from 'styled-components';
import checkSVG from '../../../assets/svgs/check.svg';

export const Checkbox = styled.div`
  display: flex;
  align-items: center;
`;

export const Input = styled.input`
  -webkit-appearance: none;
  -moz-appearance: none;
  -o-appearance: none;
  appearance: none;

  position: relative;
  width: 28px;
  height: 28px;
  border: 1px solid #22a6a2;
  border-radius: 2px;
  cursor: pointer;

  &:checked {
    background-color: #22a6a2;
    background-image: url(${checkSVG});
    background-repeat: no-repeat;
  }
`;

export const Label = styled.label`
  position: relative;
  top: -1px;
  margin-left: 12px;
  color: ${({ theme }) => theme.TEXT_COLOR};
  letter-spacing: 0.5px;
`;
