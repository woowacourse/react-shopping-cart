import styled from '@emotion/styled';
import * as T from '../../../types';

type RootProps = {
  size?: T.ButtonSize;
  bgColor?: string;
  textColor?: string;
};

const sizeTable = {
  [T.ButtonSize.SMALL]: {
    width: '138px',
    height: '47px',
    fontSize: '20px',
  },
  [T.ButtonSize.REGULAR]: {
    width: '388px',
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
  width: ${({ size }) => sizeTable[size || T.ButtonSize.REGULAR].width};
  height: ${({ size }) => sizeTable[size || T.ButtonSize.REGULAR].height};
  background-color: ${({ bgColor, theme }) => bgColor || theme.bgColor.primary};
  color: ${({ textColor, theme }) => textColor || theme.textColor.defaultWhite};
  font-family: inherit;
  font-size: ${({ size }) => sizeTable[size || T.ButtonSize.REGULAR].fontSize};
  font-weight: ${({ size }) => (size === T.ButtonSize.LARGE ? '700' : '400')};
  border: none;
  border-radius: 2px;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
`;

export default { Root };
