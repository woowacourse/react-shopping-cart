import { useState } from 'react';
import styled from 'styled-components';
// import PropType from 'prop-types';
import { COLOR } from '../../constants/styles';

function CheckBox() {
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckBoxClick = (e) => {
    setIsChecked((prev) => !prev);
  };

  return (
    <StyleCheckBox
      // onClick={handleCheckBoxClick}
      name="checkbox"
      type="checkbox"
      // checked={isChecked}
    />
  );
}

// CheckBox.propTypes = {
//   onClick: PropType.func.isRequired,
// };

export default CheckBox;

const StyleCheckBox = styled.input`
  appearance: none;
  border: 1px solid #2ac1bc;
  border-radius: 2px;
  width: 30px;
  height: 30px;
  cursor: pointer;

  &:focus {
    outline: none;
  }
  &:checked {
    background-color: ${COLOR.PRIMARY};
  }
  &::after {
    content: '✔';
    width: 30px;
    height: 100%;
    font-size: 0.75rem;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
