import Checked from '@/assets/checked.svg';
import UnChecked from '@/assets/unchecked.svg';
import styled from '@emotion/styled';

interface Props {
  isSelected: boolean;
  onClick: () => void;
}

const CheckBox = ({ isSelected, onClick }: Props) => {
  return isSelected ? (
    <StyledButton onClick={onClick}>
      <img src={Checked} alt="checkbox" />
    </StyledButton>
  ) : (
    <StyledButton onClick={onClick}>
      <img src={UnChecked} alt="checkbox" />
    </StyledButton>
  );
};

export default CheckBox;

const StyledButton = styled.button`
  border: none;
  padding: 0;
  background-color: transparent;
  width: fit-content;
  height: fit-content;
`;
