import styled from 'styled-components';
import { BasicButton, Flex } from '../shared/basics';
import CheckBox from './CheckBox';

function CheckedItemsController() {
  const handleClickAllCheckBox = () => {};
  return (
    <Style.CheckBoxContainer justify="space-between" align="center">
      <Flex align="center">
        <CheckBox
          onCheck={handleClickAllCheckBox}
          onUncheck={() => {
            console.log(123);
          }}
        />
        <Style.CheckBoxLabel>전체선택</Style.CheckBoxLabel>
      </Flex>
      <Style.DeleteButton type="button">상품삭제</Style.DeleteButton>
    </Style.CheckBoxContainer>
  );
}

export default CheckedItemsController;

const Style = {
  CheckBoxContainer: styled(Flex)`
    margin: 20px 0;
  `,
  DeleteButton: styled(BasicButton)`
    padding: 12px 22px;
    border: 1px solid #bbbbbb;
  `,
  CheckBoxLabel: styled.span`
    padding-left: 7px;
  `,
  CartTitle: styled.h3`
    display: flex;
    align-items: center;
    font-size: 20px;
  `,
};
