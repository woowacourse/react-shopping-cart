import PropTypes from 'prop-types';
import Styled from 'components/CartIcon/index.style';

const CartIcon = ({ category, ...rest }) => {
  return <Styled.CartIcon category={category} {...rest} />;
};

CartIcon.propTypes = {
  /**
   * 카트 아이콘이 쓰이는 곳
   */
  category: PropTypes.oneOf(['header']),
};

export default CartIcon;
