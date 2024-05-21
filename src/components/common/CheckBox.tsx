import CHECKED from "@/assets/checked.svg";
import UNCHECKED from "@/assets/unchecked.svg";
import styled from "@emotion/styled";

interface Props {
  id: string;
  isSelected: boolean;
  onClick: () => void;
}

const CheckBox = ({ id, isSelected, onClick }: Props) => {
  return (
    <label htmlFor={id}>
      <img src={isSelected ? CHECKED : UNCHECKED} alt="checkbox" />
      <StyledInput id={id} type="checkbox" onClick={onClick} />
    </label>
  );
};

export default CheckBox;

const StyledInput = styled.input`
  display: none;
`;
