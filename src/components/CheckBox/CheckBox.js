import PropTypes from 'prop-types';

import { Input, Label } from './CheckBox.styles';

const CheckBox = ({ id, size, onClick, isChecked }) => (
  <>
    <Input id={id} type="checkbox" onClick={onClick} checked={isChecked} />
    <Label htmlFor={id} size={size} />
  </>
);

CheckBox.propTypes = {
  id: PropTypes.string.isRequired,
  size: PropTypes.string,
  onClick: PropTypes.func,
  isChecked: PropTypes.bool,
};

CheckBox.defaultProps = {
  size: '28px',
  onClick: () => {},
  isChecked: false,
};

export default CheckBox;
