import PropTypes from 'prop-types';
import { 아이콘_코드 } from 'constants/';

import IconButtonStyle from './styles';

const IconButton = ({ icon, onClick }) => <IconButtonStyle icon={icon} onClick={onClick} />;

IconButton.propTypes = {
  icon: PropTypes.string,
  onClick: PropTypes.func,
};

IconButton.defaultProps = {
  icon: 아이콘_코드.CARROT,
  onClick: () => {},
};

export default IconButton;
