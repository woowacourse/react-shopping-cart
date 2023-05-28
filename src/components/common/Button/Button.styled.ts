import { styled } from 'styled-components';
import { Props } from './Button';

export const Button = styled.button<Partial<Props>>`
  display: flex;
  justify-content: center;
  align-items: center;

  border: none;

  background-color: inherit;
  color: var(--grey-100);

  cursor: pointer;

  &.square {
    border-radius: 7px;

    color: var(--grey-600);
  }

  &.rectangle {
    width: inherit;
    height: 60px;

    border: ${(props) => props.bgColor ?? 'solid 1px var(--grey-300)'};
    background-color: ${(props) => props.bgColor ?? 'var(--blue)'};

    color: ${(props) => props.bgColor ?? 'var(--grey-100)'};

    font-size: 16px;
    font-weight: 900;

    letter-spacing: 0.5px;
  }

  &:disabled {
    color: var(--grey-300);
  }
`;
