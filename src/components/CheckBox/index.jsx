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
  /**
   * 체크박스가 체크되어 있는지
   */
  checked: PropTypes.bool.isRequired,
  /**
   * 체크박스의 상태를 변경
   */
  handleChange: PropTypes.func.isRequired,
};

export default CheckBox;
