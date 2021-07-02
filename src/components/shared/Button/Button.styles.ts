import styled from '@emotion/styled';
import * as T from '../../../types';

interface RootProps {
  size: T.ButtonSize;
  bgColor: string;
  textColor: string;
  fullWidth: boolean;
}

const sizeTable = {
  [T.ButtonSize.SMALL]: {
    height: '47px',
    fontSize: '20px',
  },
  [T.ButtonSize.REGULAR]: {
    height: '73px',
    fontSize: '24px',
  },
  [T.ButtonSize.LARGE]: {
    width: '638px',
    height: '98px',
    fontSize: '32px',
    fontWeight: 'bold',
  },
};

const Root = styled.button<RootProps>`
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  padding: 0 2em;
  background-color: ${({ bgColor, theme }) => bgColor || theme.bgColor.primary};
  color: ${({ textColor, theme }) => textColor || theme.textColor.defaultWhite};
  font-family: inherit;
  border: none;
  border-radius: 2px;
  cursor: pointer;

  ${({ size }) => `
    height: ${sizeTable[size || T.ButtonSize.REGULAR].height};
    font-size: ${sizeTable[size || T.ButtonSize.REGULAR].fontSize};
    font-weight: ${size === T.ButtonSize.LARGE ? '700' : '400'};
  `}

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
`;

export default { Root };
