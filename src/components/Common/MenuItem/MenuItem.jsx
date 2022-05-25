import * as Styled from './style';
import PropTypes from 'prop-types';

const MenuItem = ({ children, onClick }) => {
  return <Styled.Wrapper onClick={onClick}>{children}</Styled.Wrapper>;
};

MenuItem.propTypes = {
  children: PropTypes.string,
  onClick: PropTypes.func,
};

export default MenuItem;
