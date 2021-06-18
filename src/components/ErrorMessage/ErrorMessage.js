import PropTypes from 'prop-types';
import { Container } from './ErrorMessage.styles';

const ErrorMessage = ({ children }) => <Container>{children}</Container>;

ErrorMessage.propTypes = {
  children: PropTypes.string.isRequired,
};

export default ErrorMessage;
