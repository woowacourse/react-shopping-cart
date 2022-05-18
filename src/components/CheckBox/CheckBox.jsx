import Styled from './style';
import PropTypes from 'prop-types';
import { useState } from 'react';

const CheckBox = ({ id, isChecked = false }) => {
  const [checked, setChecked] = useState(isChecked);

  const handleChangeChecked = () => {
    setChecked(!checked);
  };

  return (
    <Styled.Wrapper>
      <Styled.CheckBox
        id={id}
        type="checkbox"
        checked={checked}
        onChange={handleChangeChecked}
      />
      <Styled.CheckMark htmlFor={id} />
    </Styled.Wrapper>
  );
};

CheckBox.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  isChecked: PropTypes.bool,
};

export default CheckBox;
