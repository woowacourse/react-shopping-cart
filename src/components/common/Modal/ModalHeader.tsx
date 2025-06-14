import { useModalContext } from './ModalContext';
import { ModalCloseStyle, ModalHeaderStyle } from './styles';
import { ModalHeaderProps } from './types/Modal.types';

export const ModalHeader = ({ closeButton = false, children }: ModalHeaderProps) => {
  const { onHide } = useModalContext();

  return (
    <div css={ModalHeaderStyle}>
      <span>{children}</span>
      {closeButton && (
        <button css={ModalCloseStyle} onClick={onHide} aria-label='닫기'>
          <svg
            width='15'
            height='14'
            viewBox='0 0 15 14'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M14.4922 1.41L13.0822 0L7.49219 5.59L1.90219 0L0.492188 1.41L6.08219 7L0.492188 12.59L1.90219 14L7.49219 8.41L13.0822 14L14.4922 12.59L8.90219 7L14.4922 1.41Z'
              fill='black'
            />
          </svg>
        </button>
      )}
    </div>
  );
};
