import PropTypes from 'prop-types';
import Styled from 'components/CartIcon/index.style';

const CartIcon = ({ category, ...rest }) => {
  return <Styled.CartIcon category={category} {...rest} />;
};

CartIcon.propTypes = {
  category: PropTypes.oneOf(['header']),
};

export default CartIcon;
