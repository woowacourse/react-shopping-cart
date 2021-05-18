import PropTypes from 'prop-types';
import { COLOR } from '../../../constants';

export const IconUpward = (props) => {
  const { width, color, ...rest } = props;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} viewBox="0 0 10 7" fill="none" {...rest}>
      <path d="M5.00005 0L9.33018 6.75H0.669922L5.00005 0Z" fill={color} />
    </svg>
  );
};

IconUpward.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: PropTypes.string,
};

IconUpward.defaultProps = {
  width: 10,
  color: COLOR.GRAY_800,
};
