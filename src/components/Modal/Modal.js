import PropTypes from 'prop-types';
import CloseIcon from '../svg/CloseIcon/CloseIcon';

import { Dimmer, Container, CloseButton } from './Modal.styles';

const Modal = ({ children, onClickClose }) => (
  <Dimmer onClick={onClickClose}>
    <Container>
      <CloseButton onClick={onClickClose}>
        <CloseIcon />
      </CloseButton>
      {children}
    </Container>
  </Dimmer>
);

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClickClose: PropTypes.func.isRequired,
};

export default Modal;
