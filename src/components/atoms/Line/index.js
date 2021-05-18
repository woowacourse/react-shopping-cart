import PropTypes from 'prop-types';
import * as S from './style.js';
import { COLOR } from '../../../constants';

export const Line = (props) => {
  const { length, thickness, color, ...rest } = props;

  return <S.Line length={length} thickness={thickness} color={color} {...rest} />;
};

Line.propTypes = {
  length: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  thickness: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: PropTypes.string,
};

Line.defaultProps = {
  thickness: '0.25rem',
  color: COLOR.HEX.BLACK,
};
