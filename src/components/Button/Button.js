import PropTypes from 'prop-types';
import { Container } from './Button.styles';

const Button = ({ children, onClick, disabled, ...props }) => (
  <Container disabled={disabled} onClick={onClick} {...props}>
    {children}
  </Container>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  onClick: () => {},
  disabled: false,
};

export default Button;
