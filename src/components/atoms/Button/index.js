import PropTypes from 'prop-types';
import * as S from './style.js';

export const Button = (props) => {
  const { onClick, ...rest } = props;

  return <S.Button onClick={onClick} {...rest}></S.Button>;
};

Button.propTypes = {
  onClick: PropTypes.func,
};
