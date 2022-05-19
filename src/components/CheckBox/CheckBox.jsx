import Styled from './style';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

const CheckBox = ({ id, onCheck, isChecked = false }) => {
  const [checked, setChecked] = useState(isChecked);

  const handleChangeChecked = () => {
    setChecked(!checked);
    onCheck();
  };

  useEffect(() => {
    setChecked(isChecked);
  }, [isChecked]);

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
  onCheck: PropTypes.func,
};

export default CheckBox;
