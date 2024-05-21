import Checked from '@/assets/checked.svg?react';
import UnChecked from '@/assets/unchecked.svg?react';
import styled from '@emotion/styled';

interface Props {
  isSelected: boolean;
  onClick: () => void;
}

const CheckBox = ({ isSelected, onClick }: Props) => {
  return (
    <>
      <Container onClick={onClick}>
        <StyledInput
          type="checkbox"
          checked={isSelected}
          readOnly
          onClick={onClick}
        />
        {isSelected ? <Checked /> : <UnChecked />}
      </Container>
    </>
  );
};

export default CheckBox;

const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const StyledInput = styled.input`
  display: none;
`;
