import Styled from './style';
import PropTypes from 'prop-types';

const MenuItem = ({ children }) => {
  return <Styled.Wrapper>{children}</Styled.Wrapper>;
};

MenuItem.propTypes = {
  children: PropTypes.string,
};

export default MenuItem;
