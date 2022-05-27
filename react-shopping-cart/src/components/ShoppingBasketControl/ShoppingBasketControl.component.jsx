import styled from 'styled-components';
import { Button, Checkbox, FlexWrapper, Text } from 'components/@shared';

const ShoppingBasketBox = styled(FlexWrapper)`
  width: 735px;
`;

const DeleteButton = styled(Button)`
  border: 1px solid ${({ theme }) => theme.PALETTE.GRAY_004};
`;

function ShoppingBasketControl({
  isAllSelected,
  clickAllCheckbox,
  handleClickDeleteSelectedProduct,
}) {
  return (
    <ShoppingBasketBox justifyContent="space-between">
      <Checkbox
        checked={isAllSelected}
        handleChangeCheckbox={({ target }) => clickAllCheckbox(target.checked)}
      >
        <Text fontSize="small">선택 해제</Text>
      </Checkbox>
      <DeleteButton
        type="button"
        width={'117px'}
        height={'50px'}
        onClick={handleClickDeleteSelectedProduct}
      >
        <Text fontSize="small">상품 삭제</Text>
      </DeleteButton>
    </ShoppingBasketBox>
  );
}

export default ShoppingBasketControl;
