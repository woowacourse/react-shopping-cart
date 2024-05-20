import Checked from '@/assets/checked.svg';
import UnChecked from '@/assets/unchecked.svg';
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
        <ImgLabel isSelected={isSelected}></ImgLabel>
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

const ImgLabel = styled.label<{ isSelected: boolean }>`
  width: 1.5em;
  height: 1.5em;
  background-image: url(${({ isSelected }) =>
    isSelected ? Checked : UnChecked});
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
`;
