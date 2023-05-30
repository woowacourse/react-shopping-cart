import { styled } from 'styled-components';
import { CheckboxStyle } from '../@common/Checkbox';

interface Props {
  cartLength: number;
  checkedItemsCount: number;
  clickRemoveButton: () => void;
  handleCheckAllItems: () => void;
}

const TotalCheckbox = ({
  cartLength,
  checkedItemsCount,
  clickRemoveButton,
  handleCheckAllItems,
}: Props) => {
  return (
    <S.CheckboxAllWrapper>
      <S.CheckboxAll
        type="checkbox"
        id="check-all-items"
        onChange={handleCheckAllItems}
        checked={cartLength === checkedItemsCount}
      />
      <label htmlFor={'all'}>{`전체선택 ${checkedItemsCount}/${cartLength}개`}</label>
      <S.RemoveSelectedButton id="remove-checked-items" onClick={clickRemoveButton}>
        선택 삭제
      </S.RemoveSelectedButton>
    </S.CheckboxAllWrapper>
  );
};

const S = {
  CheckboxAllWrapper: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 40px;
    gap: 10px;
    font-size: 24px;
  `,

  RemoveSelectedButton: styled.button`
    width: 100px;
    height: 35px;
    padding: 5px;
    background-color: white;
    border: 1px solid #bbb;
    border-radius: 7px;
    font-size: 16px;
    cursor: pointer;
  `,

  CheckboxAll: styled(CheckboxStyle)``,
};

export default TotalCheckbox;
