import Styled from './index.style';

const CheckBox = () => {
  return (
    <Styled.CheckBoxLabel className="container">
      <input type="checkbox" />
      <span className="checkmark" />
    </Styled.CheckBoxLabel>
  );
};

export default CheckBox;
