import PropTypes from 'prop-types';
import { ModalPortal } from '../../portals';
import CloseButton from '../CloseButton/CloseButton';
import CloseIcon from '../svg/CloseIcon/CloseIcon';
import { Dimmer, Container } from './Modal.styles';

const Modal = ({ Portal, children, onClose }) => (
  <Portal>
    <Dimmer onClick={onClose}>
      <Container>
        <CloseButton onClick={onClose} Icon={CloseIcon} />
        {children}
      </Container>
    </Dimmer>
  </Portal>
);

Modal.propTypes = {
  Portal: PropTypes.node,
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

Modal.defaultProps = {
  Portal: ModalPortal,
};

export default Modal;
