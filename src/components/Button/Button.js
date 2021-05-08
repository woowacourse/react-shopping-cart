import PropTypes from 'prop-types';
import { Container } from './Button.styles';

const Button = ({ children, onClick }) => <Container onClick={onClick}>{children}</Container>;

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  onClick: () => {},
};

export default Button;
