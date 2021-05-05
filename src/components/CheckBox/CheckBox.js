import PropTypes from 'prop-types';
import { Input, Label } from './CheckBox.styles';

const CheckBox = ({ size }) => (
  <>
    <Input id="checkboxId" type="checkbox" />
    <Label htmlFor="checkboxId" size={size} />
  </>
);

CheckBox.propTypes = {
  size: PropTypes.string,
};

CheckBox.defaultProps = {
  size: '28px',
};

export default CheckBox;
