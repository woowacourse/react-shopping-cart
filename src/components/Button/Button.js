import PropTypes from 'prop-types';
import { Container } from './Button.styles';

const Button = ({ children, onClick, ...props }) => (
  <Container onClick={onClick} {...props}>
    {children}
  </Container>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  onClick: () => {},
};

export default Button;
