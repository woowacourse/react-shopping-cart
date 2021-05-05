import PropTypes from 'prop-types';
import { Container } from './Button.styles';

const Button = ({ children, ...props }) => <Container {...props}>{children}</Container>;

Button.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Button;
