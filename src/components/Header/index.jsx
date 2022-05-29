import PropTypes from 'prop-types';
import Styled from 'components/Header/index.style';

const Header = ({ left, right, ...rest }) => {
  return (
    <Styled.Container {...rest}>
      {left}
      {right}
    </Styled.Container>
  );
};

Header.propTypes = {
  left: PropTypes.element,
  right: PropTypes.element,
};

export default Header;
