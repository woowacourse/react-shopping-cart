import styled from 'styled-components';
import { TextProps } from './Text';

export const Text = styled.p<TextProps>`
  ${({ size }) => {
    switch (size) {
      case 's':
        return `
        font-size: 12px;
        line-height: 18px;
        color: #0A0D13;
        margin-top: 2px;
        `;
      case 'm':
        return `
        font-size: 16px;
        line-height: 16px;
        color: #000000;
        margin-top: 3px;
        `;
      case 'l':
        return `
        font-size: 24px;
        line-height: 34px;
        color: #000000;
        margin-top: 4px;
        `;
      default:
        return `
        font-size: ${size}px;
        line-height: ${(size as number) * 1.5}px;
        color: #000000;
        `;
    }
  }};

  font-weight: ${({ weight }) => {
    switch (weight) {
      case 's':
        return '300';
      case 'm':
        return '500';
      case 'l':
        return '700';
      default:
        return '500';
    }
  }};
`;
