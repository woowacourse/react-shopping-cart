import { ModalTitleStyle } from './styles';
import { ModalTitleProps } from './types/Modal.types';

export const ModalTitle = ({ color = '#000', children }: ModalTitleProps) => {
  return (
    <span id='modal-title' css={ModalTitleStyle(color)}>
      {children}
    </span>
  );
};
