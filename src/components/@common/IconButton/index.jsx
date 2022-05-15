import PropTypes from 'prop-types';
import { ICON_CODE } from 'constants/';

import IconButtonStyle from './styles';

const IconButton = ({ icon, onClick }) => <IconButtonStyle icon={icon} onClick={onClick} />;

IconButton.propTypes = {
  icon: PropTypes.string,
  onClick: PropTypes.func,
};

IconButton.defaultProps = {
  icon: ICON_CODE.CARROT,
  onClick: () => {},
};

export default IconButton;
