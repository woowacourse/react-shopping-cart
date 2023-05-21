import { styled } from 'styled-components';

export const StyleCheckBox = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  opacity: 0;
  height: 2.8rem;
  width: 2.8rem;

  cursor: pointer;
`;

export const StyleCheckMark = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 2.8rem;
  width: 2.8rem;

  background-color: ${({ theme }) => theme.lightColor};
  border-radius: 3px;
  border: 1px solid ${({ theme }) => theme.infoColor};

  ${StyleCheckBox}:checked + & {
    background-color: ${({ theme }) => theme.primaryColor};
    border: 1px solid ${({ theme }) => theme.successColor};
  }

  &::after {
    content: '';
    position: absolute;
    display: none;
    left: 0.9rem;
    top: 0.3rem;
    width: 7px;
    height: 13px;
    border: solid white;
    border-width: 0 3px 3px 0;

    transform: rotate(45deg);
  }
`;

export const StyleLabel = styled.label`
  position: relative;
  display: inline-block;
  height: 2.8rem;
  width: 2.8rem;

  ${StyleCheckBox}:checked + ${StyleCheckMark}::after {
    display: block;
  }
`;
