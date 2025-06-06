import { css } from '@emotion/react';

// const SIZE_MAP = {
//   small: 320,
//   medium: 480,
//   large: 600,
// };

export const ModalWrapperStyle = (show: boolean) => css`
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  min-width: 320px;
  display: ${show ? 'block' : 'none'};
`;

export const backGroundStyle = (background: boolean) => css`
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.35);
  visibility: ${background ? 'visible' : 'hidden'};
`;

export const ModalContainerStyle = (
  position: string
  // size: 'small' | 'medium' | 'large' = 'medium'
) => {
  const positionStyle = getPositionStyle(position);
  // const maxWidth = SIZE_MAP[size];

  return css`
    display: flex;
    flex-direction: column;
    background: #fff;
    z-index: 99;
    box-sizing: border-box;
    padding: 24px 32px;
    min-width: 320px;
    ${['center', 'bottom', 'top'].includes(position) &&
    css`
      max-width: 425px;
      margin: 0 auto;
      width: 100%;
    `}
    gap: 16px;
    ${positionStyle}
  `;
};

export const ModalHeaderStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-bottom: 12px;
  border-bottom: 1px solid #ddd;

  img {
    cursor: pointer;
  }
`;

export const ModalTitleStyle = (color: string) => css`
  color: ${color};
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export const ModalBodyStyle = css`
  display: flex;
  flex-direction: column;
  gap: 18px;
  width: 100%;
  max-height: 300px;
  overflow-y: auto;
`;

export const ModalFooterStyle = (
  align: 'left' | 'center' | 'right' = 'right'
) => css`
  display: flex;
  flex-direction: column;
  justify-content: ${align === 'left'
    ? 'flex-start'
    : align === 'center'
    ? 'center'
    : 'flex-end'};
  gap: 10px;
`;

export const ModalCloseStyle = css`
  background-color: transparent;
  border: 0;
  cursor: pointer;
`;

export const getPositionStyle = (position: string) => {
  switch (position) {
    case 'center':
      return css`
        width: calc(100% - 72px);
        border-radius: 8px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      `;
    case 'bottom':
      return css`
        /* width: 100%; */
        border-radius: 8px 8px 0 0;
        position: fixed;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
      `;
    case 'top':
      return css`
        /* width: 100%; */
        border-radius: 0 0 8px 8px;
        position: fixed;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
      `;
    default:
      return css``;
  }
};
