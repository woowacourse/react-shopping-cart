import PropTypes from 'prop-types';
import { ICON_CODE } from 'constants/';

import Container from './styles';

function IconButton({ className, icon, onClick }) {
  return <Container className={className} icon={icon} onClick={onClick} />;
}

IconButton.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string,
  onClick: PropTypes.func,
};

IconButton.defaultProps = {
  className: '',
  icon: ICON_CODE.CARROT,
  onClick: () => {},
};

export default IconButton;
