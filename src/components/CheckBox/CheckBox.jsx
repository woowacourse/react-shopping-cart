import Styled from './style';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

const CheckBox = ({ id, onCheck, checkedStatus = false }) => {
  const [checked, setChecked] = useState(checkedStatus);

  const handleChange = () => {
    setChecked((checked) => !checked);
    onCheck();
  };

  useEffect(() => {
    setChecked(checkedStatus);
  }, [checkedStatus]);

  return (
    <Styled.Wrapper>
      <Styled.CheckBox
        id={id}
        type="checkbox"
        checked={checked}
        onChange={handleChange}
      />
      <Styled.CheckMark htmlFor={id} />
    </Styled.Wrapper>
  );
};

CheckBox.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  checkedStatus: PropTypes.bool,
  onCheck: PropTypes.func,
};

export default CheckBox;
