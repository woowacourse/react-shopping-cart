import Styled from './index.style';

const CheckBox = ({ checked, handleChange }) => {
  return (
    <Styled.CheckBoxLabel className="container">
      <input type="checkbox" checked={checked} onChange={handleChange} />
      <span className="checkmark" />
    </Styled.CheckBoxLabel>
  );
};

export default CheckBox;
