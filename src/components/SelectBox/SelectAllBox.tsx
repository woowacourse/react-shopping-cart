import styled from '@emotion/styled';
import { CheckboxContainer, HiddenCheckbox, ModifyRow, StyledCheckbox } from '../Cart/Cart.styles';

interface SelectBoxProps {
  isAllChecked: boolean;
  handleAllCheck: (checked: boolean) => void;
}

function SelectAllBox({ isAllChecked, handleAllCheck }: SelectBoxProps) {
  return (
    <CartSelectAll>
      <ModifyRow>
        <CheckboxContainer>
          <HiddenCheckbox
            type="checkbox"
            checked={isAllChecked}
            onChange={() => handleAllCheck(isAllChecked)}
          />
          <StyledCheckbox checked={isAllChecked} />
        </CheckboxContainer>
        <span>전체 선택</span>
      </ModifyRow>
    </CartSelectAll>
  );
}

export default SelectAllBox;

const CartSelectAll = styled.div`
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
