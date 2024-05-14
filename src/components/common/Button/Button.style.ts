import styled from 'styled-components';
import { ButtonRadius, ButtonSize, ButtonWidth } from './Button';

export const Button = styled.button<{ size: ButtonSize; width: ButtonWidth; radius: ButtonRadius }>`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  height: ${(props) => {
    switch (props.size) {
      case 's':
        return '24px';
      case 'm':
        return '36px';
      case 'l':
        return '48px';
      default:
        return '';
    }
  }};
  width: ${(props) => {
    switch (props.width) {
      case 'fit':
        return 'fit-content';
      case 'full':
        return '100%';
      default:
        return `${props.width}px`;
    }
  }};
  border-radius: ${(props) => {
    switch (props.radius) {
      case 's':
        return '4px';
      case 'm':
        return '8px';
      case 'l':
        return '16px';
      default:
        return `${props.radius}px`;
    }
  }};

  padding: 4px 8px;

  background-color: white;
  border: 1px solid #00000019;
`;
