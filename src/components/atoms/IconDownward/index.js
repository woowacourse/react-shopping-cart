import PropTypes from 'prop-types';

export const IconDownward = (props) => {
  const { width, color, ...rest } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height="7"
      viewBox="0 0 10 7"
      fill="none"
      {...rest}
    >
      <path d="M5.00005 7L0.669922 0.25L9.33018 0.250001L5.00005 7Z" fill={color} />
    </svg>
  );
};

IconDownward.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: PropTypes.string,
};

IconDownward.defaultProps = {
  width: 10,
  color: '#333333',
};
