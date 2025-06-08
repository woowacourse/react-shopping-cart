import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { ModalContainerProps } from './Modal.tsx';

export const Layout = styled.div`
  position: absolute;
  display: flex;
  inset: 0;
  background-color: #00000059;
  z-index: 10;
`;

export const Overlay = styled.div`
  position: absolute;
  inset: 0;
`;

export const sizeStyles = {
  sm: {
    width: '320px',
    height: '206px',
  },
  md: {
    width: '480px',
    height: '206px',
  },
  lg: {
    width: '600px',
    height: '206px',
  },
};

export const ModalContainer = styled.div<ModalContainerProps>`
  box-sizing: border-box;
  position: absolute;
  background-color: #ffffff;
  border: none;
  padding: 24px 16px;
  overflow-y: auto;

  ${({ size, width, height }) => {
    if (width || height) {
      return css`
        width: ${width || 'auto'};
        height: ${height || 'auto'};
      `;
    }

    if (size && sizeStyles[size]) {
      return css`
        width: ${sizeStyles[size].width};
        height: ${sizeStyles[size].height};
      `;
    }

    return css`
      width: 480px;
      height: 157px;
    `;
  }}

  ${({ position }) =>
    position === 'center'
      ? css`
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border-radius: 8px;
        `
      : css`
          bottom: 0;
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
        `}
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.h3`
  margin: 0;
  padding: 0;
  font-weight: 700;
  font-size: 18px;
  line-height: 100%;
`;

export const CloseButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  border: none;
  background: none;
  cursor: pointer;
`;

export const CloseIcon = styled.span`
  width: 100%;
  height: 100%;
  display: inline-block;
  position: relative;
  background: transparent;
  cursor: pointer;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 16px;
    height: 2px;
    background-color: currentColor;
    transform-origin: center;
  }

  &::before {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &::after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`;
