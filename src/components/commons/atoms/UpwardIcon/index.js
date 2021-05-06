import PropTypes from 'prop-types';

export const UpwardIcon = (props) => {
  const { width, color } = props;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} viewBox="0 0 10 7" fill="none">
      <path d="M5.00005 0L9.33018 6.75H0.669922L5.00005 0Z" fill={color} />
    </svg>
  );
};

UpwardIcon.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: PropTypes.string,
};

UpwardIcon.defaultProps = {
  width: 10,
  color: '#333333',
};
