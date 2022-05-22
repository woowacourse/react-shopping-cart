import PropTypes from 'prop-types';
import Styled from 'components/CheckBox/index.style';

const CheckBox = ({ checked, handleChange }) => {
  return (
    <Styled.Container>
      <input type="checkbox" checked={checked} onChange={handleChange} />
      <Styled.CheckMark />
    </Styled.Container>
  );
};

CheckBox.propTypes = {
  checked: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default CheckBox;
