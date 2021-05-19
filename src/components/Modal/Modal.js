import PropTypes from 'prop-types';

import { Dimmer, Container, CloseButton } from './Modal.styles';

const Modal = ({ children, onClickClose }) => (
  <Dimmer onClick={onClickClose}>
    <Container>
      <CloseButton onClick={onClickClose}>
        <svg viewBox="0 0 40 40">
          <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
        </svg>
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
