import PropTypes from 'prop-types';

import { Container, CloseButton } from './AlertModal.styles';

const AlertModal = ({ children }) => (
  <Container>
    <CloseButton>
      <svg viewBox="0 0 40 40">
        <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
      </svg>
    </CloseButton>
    {children}
  </Container>
);

AlertModal.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AlertModal;
