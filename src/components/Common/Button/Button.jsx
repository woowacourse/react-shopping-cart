import PropTypes from 'prop-types';
import { buttonColor, buttonSize } from './style';
import * as Styled from './style';

const Button = ({ colorType, sizeType, children, ...rest }) => {
  return (
    <Styled.Button
      type="button"
      colorType={colorType}
      sizeType={sizeType}
      {...rest}
    >
      {children}
    </Styled.Button>
  );
};

Button.propTypes = {
  colorType: PropTypes.oneOf(Object.keys(buttonColor)),
  sizeType: PropTypes.oneOf(Object.keys(buttonSize)),
  children: PropTypes.string,
};

export default Button;
