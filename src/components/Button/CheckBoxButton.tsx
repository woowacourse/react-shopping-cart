import Checked from '@/assets/checked.svg';
import UnChecked from '@/assets/unchecked.svg';
import styled from '@emotion/styled';

interface Props {
  isSelected: boolean;
  onClick: () => void;
}

const CheckBox = ({ isSelected, onClick }: Props) => {
  return (
    <StyledButton onClick={onClick}>
      <img
        src={isSelected ? Checked : UnChecked}
        alt={isSelected ? 'Checked box' : 'Unchecked box'}
      />
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
  cursor: pointer;
`;
