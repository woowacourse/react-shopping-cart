import * as Styled from './style';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

const CheckBox = ({ onCheck, checkedStatus = false }) => {
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
      <Styled.Label checked={checked}>
        <Styled.Input
          type="checkbox"
          checked={checked}
          onChange={handleChange}
        />
      </Styled.Label>
    </Styled.Wrapper>
  );
};

CheckBox.propTypes = {
  checkedStatus: PropTypes.bool,
  onCheck: PropTypes.func,
};

export default CheckBox;
