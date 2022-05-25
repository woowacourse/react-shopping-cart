import styled from 'styled-components';
import Button from 'component/common/Button';
import { removeProductCart } from 'store/action/cartActions';
import { ALERT_MESSAGE } from 'constant/messages';
import { updateSnackBar } from 'store/action/snackBarActions';
import { useDispatch } from 'react-redux';
import { memo } from 'react';

function AllRemoveButton({ products }) {
  const dispatch = useDispatch();

  const handleAllRemoveClick = () => {
    products
      .filter(product => product.checked)
      .forEach(product => dispatch(removeProductCart(product)));

    dispatch(updateSnackBar(ALERT_MESSAGE.CHECKED_REMOVE_CART));
  };

  return (
    <Button onClick={handleAllRemoveClick}>
      <Styled.DeleteButtonContent>상품 삭제</Styled.DeleteButtonContent>
    </Button>
  );
}

export default memo(AllRemoveButton);

const Styled = {
  DeleteButtonContent: styled.div`
    width: 117px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid #bbbbbb;

    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 21px;

    color: #333333;

    &:hover {
      background-color: #2ac1bc;
      color: white;
    }
  `,
};
