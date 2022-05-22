import Button from 'component/common/Button';
import CheckBox from 'component/common/CheckBox';
import { ALERT_MESSAGE } from 'constant/messages';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkProductCart, removeProductCart } from 'store/action/cartActions';
import { updateSnackBar } from 'store/action/snackBarActions';
import styled from 'styled-components';

export default function CartOperationHead({ products }) {
  const dispatch = useDispatch();
  const [allCheck, setAllCheck] = useState(true);

  useEffect(() => {
    setAllCheck(products.every(product => product.checked));
  }, [products]);

  const handleAllCheck = () => {
    setAllCheck(!allCheck);
    products.forEach(product => dispatch(checkProductCart(product, !allCheck)));
  };

  const handleAllRemoveClick = () => {
    products
      .filter(product => product.checked)
      .forEach(product => dispatch(removeProductCart(product)));

    dispatch(updateSnackBar(ALERT_MESSAGE.CHECKED_REMOVE_CART));
  };

  return (
    <CartOperationHeadBox>
      <CheckBox description="전체선택" onCheckChange={handleAllCheck} checked={allCheck} />
      <Button onClick={handleAllRemoveClick}>
        <DeleteButtonContent>상품 삭제</DeleteButtonContent>
      </Button>
    </CartOperationHeadBox>
  );
}

const CartOperationHeadBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 26px;
`;

const DeleteButtonContent = styled.div`
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
`;
