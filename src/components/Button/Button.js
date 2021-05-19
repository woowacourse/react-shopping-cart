import PropTypes from 'prop-types';
import { Container } from './Button.styles';

const Button = props => <Container {...props} />;

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  onClick: () => {},
};

export default Button;
