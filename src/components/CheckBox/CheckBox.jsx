import Styled from './style';
import PropTypes from 'prop-types';

const CheckBox = ({ id, isChecked = false }) => {
  return (
    <Styled.Wrapper>
      <Styled.CheckBox id={id} type="checkbox" checked={isChecked} />
      <Styled.CheckMark htmlFor={id} />
    </Styled.Wrapper>
  );
};

CheckBox.propTypes = {
  id: PropTypes.number,
  isChecked: PropTypes.bool,
};

export default CheckBox;
