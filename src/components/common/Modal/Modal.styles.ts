import { css } from '@emotion/react';

const Common = {
  colors: {
    white: '#ffffff',
    black: '#000000',
    grey: 'rgba(0, 0, 0, 0.3)',
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
  height: 75%;
  min-height: 150px;
  padding: 2.4rem 3.2rem;
  z-index: ${Common.zIndex.modalContainer};
  display: flex;
  flex-direction: column;

  ${position === 'center' &&
  css`
    min-width: 390px;
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
  margin-bottom: 2.4rem;
`;

export const CloseButtonStyle = (showCloseButton: boolean) => css`
  background-color: transparent;
  cursor: pointer;
  display: ${showCloseButton ? 'block' : 'none'};
  font-size: 2.4rem;
  padding: 0;
`;
