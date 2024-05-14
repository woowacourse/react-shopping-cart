import styled from 'styled-components';
import { ButtonProps, ButtonRadius, ButtonSize, ButtonWidth } from './Button';

export const Button = styled.button<ButtonProps>`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ color }) => {
    switch (color) {
      case 'default':
        return `
        background-color: white;
        color: black;
      `;
      case 'primary':
        return `
        background-color: black;
        color: white;
      `;
    }
  }}

  ${(props) => {
    switch (props.size) {
      case 's':
        return `
          height: 24px;
          min-width: 24px;
          padding: 4px 8px;
        `;
      case 'm':
        return `
          height: 32px;
          min-width: 32px;
          padding: 8px 12px;
      `;
      case 'l':
        return `
          height: 40px;
          min-width: 40px;
          padding: 12px 16px;
      `;
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
  border: 1px solid lightGray;

  ${(props) => {
    if (props.square) {
      switch (props.size) {
        case 's':
          return `
            height: 24px;
            width: 24px;
            padding: 4px 4px;
          `;
        case 'm':
          return `
            height: 32px;
            width: 32px;
            padding: 8px 8px;
          `;
        case 'l':
          return `
            height: 40px;
            width: 40px;
            padding: 12px 12px;
          `;
        default:
          return '';
      }
    }
  }}
`;
