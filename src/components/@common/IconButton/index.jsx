import PropTypes from 'prop-types';
import { ICON_CODE } from 'constants/';

import Container from './styles';

const IconButton = ({ icon, onClick }) => <Container icon={icon} onClick={onClick} />;

IconButton.propTypes = {
  icon: PropTypes.string,
  onClick: PropTypes.func,
};

IconButton.defaultProps = {
  icon: ICON_CODE.CARROT,
  onClick: () => {},
};

export default IconButton;
