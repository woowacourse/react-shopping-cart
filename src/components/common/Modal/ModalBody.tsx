import { ModalBodyStyle } from './styles';
import { ModalBodyProps } from './types/Modal.types';

export const ModalBody = ({ height, children }: ModalBodyProps) => {
  return <div css={ModalBodyStyle(height ?? 0)}>{children}</div>;
};

