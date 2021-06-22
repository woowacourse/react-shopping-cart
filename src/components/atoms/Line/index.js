import PropTypes from 'prop-types';
import * as S from './style.js';
import { COLOR } from '../../../constants';

export const Line = (props) => {
  const { width, thickness, color, ...rest } = props;

  return <S.Line width={width} thickness={thickness} color={color} {...rest} />;
};

Line.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  thickness: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  color: PropTypes.string.isRequired,
};

Line.defaultProps = {
  width: '100%',
  thickness: '0.25rem',
  color: COLOR.HEX.BLACK,
};
