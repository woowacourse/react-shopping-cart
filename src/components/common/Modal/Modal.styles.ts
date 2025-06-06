import { css } from '@emotion/react';

const Common = {
  colors: {
    white: '#ffffff',
    black: '#000000',
    grey: '#00000080',
  },
  zIndex: {
    modalBackground: 100,
    modalContainer: 200,
  },
};

export const ModalBackgroundStyle = (
  isOpen: boolean,
  position: 'center' | 'bottom'
) => css`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  background-color: ${Common.colors.grey};
  backdrop-filter: blur(10px);
  width: 100%;
  min-width: 376px;
  height: 100%;
  margin: 0 auto;
  z-index: ${Common.zIndex.modalBackground};
  transition: opacity 0.3s ease, visibility 0.3s ease;
  visibility: ${isOpen ? 'visible' : 'hidden'};
  opacity: ${isOpen ? '1' : '0'};
  align-items: ${position === 'center' ? 'center' : 'flex-end'};
`;

export const ModalContainerStyle = (position: 'center' | 'bottom') => css`
  position: relative;
  background-color: ${Common.colors.white};
  color: ${Common.colors.black};
  height: 20%;
  min-height: 150px;
  padding: 30px 35px;
  z-index: ${Common.zIndex.modalContainer};
  display: flex;
  flex-direction: column;

  ${position === 'center' &&
  css`
    min-width: 250px;
    border-radius: 16px;
  `}

  ${position === 'bottom' &&
  css`
    width: 100%;
    border-radius: 10px 10px 0 0;
  `}
`;

export const ModalHeaderStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 26px;
  margin: 0 auto;
`;

export const CloseButtonStyle = (showCloseButton: boolean) => css`
  background-color: transparent;
  cursor: pointer;
  display: ${showCloseButton ? 'block' : 'none'};
`;
