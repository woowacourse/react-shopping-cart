import styled from 'styled-components';
import PropType from 'prop-types';

import { COLOR } from 'constants/styles';

import usePropInitState from 'hooks/usePropInitState';

function CheckBox({ checked, onCheck, onUncheck }) {
  const [isChecked, setIsChecked] = usePropInitState(checked);

  const handleCheckBoxClick = () => {
    if (isChecked) {
      onUncheck();
    } else {
      onCheck();
    }
    setIsChecked((prev) => !prev);
  };

  return (
    <StyleCheckBox
      name="checkbox"
      type="checkbox"
      onChange={handleCheckBoxClick}
      checked={isChecked}
    />
  );
}

CheckBox.propTypes = {
  checked: PropType.bool,
  onCheck: PropType.func.isRequired,
  onUncheck: PropType.func.isRequired,
};

CheckBox.defaultProps = {
  checked: true,
};

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
