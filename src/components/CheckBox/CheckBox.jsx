import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import PropType from 'prop-types';
import { COLOR } from '../../constants/styles';
import usePropDefaultState from '../../hooks/usePropDefaultState';
import { checkOne, uncheckOne } from '../../store/carts';

function CheckBox({ checked, id }) {
  const dispatch = useDispatch();

  const [isChecked, setIsChecked] = usePropDefaultState(checked);
  const handleCheckBoxClick = () => {
    if (isChecked) {
      // onCheck();
      console.log('uncheck');
      dispatch(uncheckOne(id));
    } else {
      // onUncheck();
      console.log('check');
      dispatch(checkOne(id));
    }
    setIsChecked((prev) => !prev);
  };

  return (
    <StyleCheckBox
      name="checkbox"
      type="checkbox"
      onClick={handleCheckBoxClick}
      checked={isChecked}
    />
  );
}

// CheckBox.propTypes = {
//   onCheck: PropType.func.isRequired,
//   onUncheck: PropType.func.isRequired,
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
