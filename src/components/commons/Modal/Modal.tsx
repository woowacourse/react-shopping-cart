import * as Styled from './Modal.styles';
import BackDrop from '../BackDrop/BackDrop';

export interface Props {
  animation?: 'fadeIn';
  children: React.ReactNode;
  onBackDropClick?: () => void;
}

const Modal = ({ children, animation = 'fadeIn', onBackDropClick }: Props) => {
  return (
    <Styled.Modal animation={animation}>
      <BackDrop onBackDropClick={onBackDropClick} />
      <Styled.ModalContent>{children}</Styled.ModalContent>
    </Styled.Modal>
  );
};

export default Modal;
