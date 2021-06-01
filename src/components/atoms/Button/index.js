import PropTypes from 'prop-types';
import * as S from './style.js';

export const Button = (props) => {
  return <S.Button {...props}></S.Button>;
};

Button.propTypes = {
  style: PropTypes.object,
  onClick: PropTypes.func,
};
