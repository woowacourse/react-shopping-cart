import PropTypes from 'prop-types';
import { CheckBoxStyle, DefaultCheckBox } from './styles';

const CheckBox = ({ children, checkState, handleChecked }) => (
  <label>
    <CheckBoxStyle isChecked={checkState}>
      ✔
      <DefaultCheckBox type="checkbox" onChange={() => handleChecked()} />
    </CheckBoxStyle>
    {children}
  </label>
);

CheckBox.propTypes = {
  checkState: PropTypes.bool,
  handleChecked: PropTypes.func,
};

CheckBox.defaultProps = {
  checkState: false,
  handleChecked: () => {},
};

export default CheckBox;
