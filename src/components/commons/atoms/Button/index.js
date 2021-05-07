import PropTypes from 'prop-types';
import * as Styled from './style.js';

export const Button = (props) => {
  return <Styled.Button {...props}></Styled.Button>;
};

Button.propTypes = {
  style: PropTypes.object,
  onClick: PropTypes.func,
};
