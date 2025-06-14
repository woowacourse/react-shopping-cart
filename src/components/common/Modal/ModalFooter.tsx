import { ModalFooterStyle } from './styles';
import { ModalFooterProps } from './types/Modal.types';

export const ModalFooter = ({ buttonAlign = 'left', children }: ModalFooterProps) => {
  return <div css={ModalFooterStyle(buttonAlign)}>{children}</div>;
};
