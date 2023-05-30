import { styled } from 'styled-components';

interface CheckboxProps {
  boxsize?: 'small' | 'medium' | 'large';
}

const getCheckBoxSize = (size: 'small' | 'medium' | 'large') => {
  switch (size) {
    case 'small':
      return '16px';
    case 'medium':
      return '22px';
    case 'large':
      return '28px';
    default:
      return '22px';
  }
};

const getPositionCheckMark = (size: 'small' | 'medium' | 'large'): [string, string] => {
  switch (size) {
    case 'small':
      return ['0.35rem', '0.rem'];
    case 'medium':
      return ['0.55rem', '-0.1rem'];
    case 'large':
      return ['0.8rem', '0.3rem'];
    default:
      return ['0.55rem', '-0.1rem'];
  }
};

export const StyleCheckBox = styled.input.attrs({ type: 'checkbox' })<CheckboxProps>`
  position: absolute;
  opacity: 0;
  height: ${({ boxsize }) => getCheckBoxSize(boxsize || 'medium')};
  width: ${({ boxsize }) => getCheckBoxSize(boxsize || 'medium')};

  cursor: pointer;
`;

export const StyleCheckMark = styled.span<CheckboxProps>`
  position: absolute;
  top: 0;
  left: 0;
  height: ${({ boxsize }) => getCheckBoxSize(boxsize || 'medium')};
  width: ${({ boxsize }) => getCheckBoxSize(boxsize || 'medium')};

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
    left: ${({ boxsize }) => getPositionCheckMark(boxsize || 'medium')[0]};
    top: ${({ boxsize }) => getPositionCheckMark(boxsize || 'medium')[1]};
    width: ${({ boxsize }) => (boxsize === 'small' ? '4px' : '7px')};
    height: ${({ boxsize }) => (boxsize === 'small' ? '8px' : '14px')};
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
