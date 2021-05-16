import PropTypes from 'prop-types';
import CloseIcon from '../svg/CloseIcon/CloseIcon';
import { Dimmer, Container, Button } from './Modal.styles';

const Modal = ({ children, onClose }) => (
  <Dimmer onClick={onClose}>
    <Container>
      <Button onClick={onClose}>
        <CloseIcon />
      </Button>
      {children}
    </Container>
  </Dimmer>
);

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
