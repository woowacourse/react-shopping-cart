import PropTypes from 'prop-types';
import { SpinnerContainer } from './Spinner.styles';

const Spinner = ({ scale }) => <SpinnerContainer scale={scale} />;

Spinner.propTypes = {
  scale: PropTypes.string,
};

Spinner.defaultProps = {
  scale: '1.0',
};

export default Spinner;
