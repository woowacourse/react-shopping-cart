import styled from 'styled-components';
import CHECKED from '../../../assets/check-true.svg';
import NOT_CHECKED from '../../../assets/check-false.svg';

export const Checkbox = styled.input`
  height: 24px;
  width: 24px;
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
  appearance: none;
  margin: 0;

  &:checked {
    background-image: url(${CHECKED});
  }

  &:not(:checked) {
    background-image: url(${NOT_CHECKED});
  }
`;
