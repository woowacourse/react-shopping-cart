import CHECKED from "@/assets/checked.svg";
import UNCHECKED from "@/assets/unchecked.svg";
import styled from "@emotion/styled";

interface Props {
  id: string;
  isSelected: boolean;
  disabled?: boolean;
  onClick: () => void;
}

const CheckBox = ({ id, isSelected, onClick, disabled = false }: Props) => {
  return (
    <StyledLabel htmlFor={id} disabled={disabled}>
      <img src={isSelected ? CHECKED : UNCHECKED} alt="checkbox" />
      <StyledInput id={id} type="checkbox" onClick={onClick} />
    </StyledLabel>
  );
};

export default CheckBox;

const StyledInput = styled.input`
  display: none;
`;

const StyledLabel = styled.label<{ disabled: boolean }>`
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
`;
