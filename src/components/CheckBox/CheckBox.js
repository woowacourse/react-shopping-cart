import PropTypes from 'prop-types';

import { Input, Label } from './CheckBox.styles';

const CheckBox = ({ id, size, onClick, onChange, isChecked }) => (
  <>
    <Input id={id} type="checkbox" onClick={onClick} onChange={onChange} checked={isChecked} />
    <Label htmlFor={id} size={size} />
  </>
);

CheckBox.propTypes = {
  id: PropTypes.number.isRequired,
  size: PropTypes.string,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  isChecked: PropTypes.bool,
};

CheckBox.defaultProps = {
  size: '28px',
  onClick: () => {},
  onChange: () => {},
  isChecked: false,
};

export default CheckBox;
