import * as Styled from './Modal.styles';
import BackDrop from '../BackDrop/BackDrop';
import { createPortal } from 'react-dom';

export interface Props {
  children: React.ReactNode;
  onBackDropClick?: () => void;
}

const ModalPortal = (child: React.ReactNode) => {
  const $modal = document.getElementById('modal');
  if (!$modal) throw Error('cannot find modal');

  return createPortal(child, $modal);
};

const Modal = ({ children, onBackDropClick }: Props) => {
  return ModalPortal(
    <Styled.Modal>
      <BackDrop onBackDropClick={onBackDropClick} />
      <Styled.ModalContent>{children}</Styled.ModalContent>
    </Styled.Modal>
  );
};

export default Modal;
