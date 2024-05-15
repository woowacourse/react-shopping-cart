import CheckIcon from '@assets/check.svg';
import NoneCheckIcon from '@assets/noneCheck.svg';
import { COLOR } from '@styles/style.constant';
import styled from 'styled-components';

export const CheckBoxInput = styled.input`
  appearance: none;
  width: 24px;
  height: 24px;
  border-radius: 8px;
  background-repeat: no-repeat;
  background-size: 70% 70%;
  background-position: 50%;
  background-image: url(${NoneCheckIcon});
  background-color: ${COLOR.white};
  border: 1px solid ${COLOR.borderColor};

  &:checked {
    background-image: url(${CheckIcon});
    background-color: ${COLOR.black};
  }
`;
