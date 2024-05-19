import styled from 'styled-components';
import checked from '../../assets/checked.png';
import unchecked from '../../assets/unchecked.png';

export const Checkbox = styled.label`
  width: 2.5rem;
  height: 2.4rem;
  padding: 0;
  background-color: transparent;
  border: none;

  user-select: none;
  cursor: pointer;
`;

export const Input = styled.input`
  appearance: none;
  border-radius: 0.35rem;
  width: 2.5rem;
  height: 2.5rem;
  background-image: url(${unchecked});

  &:checked {
    border-color: transparent;
    background-image: url(${checked});
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
  }

  cursor: pointer;
`;
