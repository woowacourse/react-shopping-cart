import { ModalPortal } from '../../../portal';
import CloseIcon from '../../atom/CloseIcon/CloseIcon';
import { Dimmer, Container, CloseButton } from './Modal.styles';

interface ModalProps {
  children: React.ReactNode;
  onClickClose: React.MouseEventHandler<HTMLDivElement>;
}
const Modal = ({ children, onClickClose }: ModalProps) => (
  <ModalPortal>
    <Dimmer
      onClick={(event: React.MouseEvent<HTMLDivElement>) => onClickClose(event)}
    >
      <Container>
        <CloseButton
          onClick={(event: React.MouseEvent<HTMLDivElement>) =>
            onClickClose(event)
          }
        >
          <CloseIcon scale="1.0" />
        </CloseButton>
        {children}
      </Container>
    </Dimmer>
  </ModalPortal>
);

export default Modal;
export type { ModalProps };
