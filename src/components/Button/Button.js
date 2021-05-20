import PropTypes from 'prop-types';
import { Container } from './Button.styles';

const Button = ({ children, onClick, disabled, ...props }) => (
  <Container disabled={disabled} onClick={onClick} {...props}>
    {children}
  </Container>
);

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  children: <></>,
  onClick: () => {},
  disabled: false,
};

export default Button;
