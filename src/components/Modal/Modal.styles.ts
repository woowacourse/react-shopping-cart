import { css } from '@emotion/react';
import { ModalFooterProps, ModalPosition, ModalSizeType } from './Modal.types';

export const backdropStyle = css({
  position: 'fixed',
  left: 0,
  top: 0,
  width: '100%',
  height: '100vh'
});

export const modalWrapperStyle = (position?: ModalPosition, size?: ModalSizeType) =>
  css({
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
    position: 'fixed',
    top: position === 'bottom' ? 'auto' : '50%',
    bottom: position === 'bottom' ? '0' : 'auto',
    left: '50%',
    padding: '24px 32px',
    borderRadius: '8px',
    backgroundColor: 'white',
    transform: position === 'bottom' ? 'translateX(-50%)' : 'translate(-50%, -50%)',
    zIndex: 1,
    width: size === 'small' ? '320px' : size === 'large' ? '600px' : '480px'
  });

export const modalTitleStyle = css({
  fontSize: '18px',
  fontWeight: 700,
  color: '#000'
});

const justifyMap = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end'
} as const;

export const modalFooterStyle = (align: ModalFooterProps['align'] = 'right') =>
  css({
    display: 'flex',
    justifyContent: justifyMap[align],
    gap: '12px'
  });
