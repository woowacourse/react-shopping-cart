import { Container, Label } from "./\bCheckBox.styles";

interface CheckBoxProps {
  label?: string;
  id: string;
}

function CheckBox({ label, id }: CheckBoxProps) {
  return (
    <div css={Container}>
      <input id={id} type="checkbox" checked={true} />
      {label && (
        <label css={Label} htmlFor={id}>
          {label}
        </label>
      )}
    </div>
  );
}

export default CheckBox;
