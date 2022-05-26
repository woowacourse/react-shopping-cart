import StyledCheckbox from "./Checkbox.styled";

function Checkbox({ onChange, checked }) {
  return (
    <StyledCheckbox
      className="checkbox"
      name="checkbox"
      type="checkbox"
      checked={checked}
      onChange={onChange}
    />
  );
}

export default Checkbox;
