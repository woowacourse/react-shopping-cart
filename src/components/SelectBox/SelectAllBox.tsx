import styled from '@emotion/styled';
import { CheckboxContainer, HiddenCheckbox, ModifyRow, StyledCheckbox } from './SelectBox.styles';

interface SelectBoxProps {
  isAllChecked: boolean;
  checkAll: (checked: boolean) => void;
}

function SelectAllBox({ isAllChecked, checkAll }: SelectBoxProps) {
  return (
    <Container>
      <ModifyRow>
        <CheckboxContainer>
          <HiddenCheckbox
            type="checkbox"
            checked={isAllChecked}
            onChange={() => checkAll(isAllChecked)}
          />
          <StyledCheckbox checked={isAllChecked} />
        </CheckboxContainer>
        <span>전체 선택</span>
      </ModifyRow>
    </Container>
  );
}

export default SelectAllBox;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin: 36px 0 20px 0;
  text-align: center;
  font-size: 12px;
  font-weight: 500;
  line-height: 150%;
  color: #0a0d13;
`;
