import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useState } from 'react';
import useDelete from 'hooks/shared/useDelete';
import CartItem from 'components/CartItem';
import Checkbox from 'components/Checkbox';
import useGetCartList from 'hooks/useGetCartList';
import { API_PATH } from 'constants/path';

const CartTable = ({ cartList, checkedIdList, setCheckedIdList }) => {
  const [isAllChecked, setIsAllChecked] = useState(true);
  const [isEachChecked, setIsEachChecked] = useState(true);
  const { callDeleteApi } = useDelete(API_PATH.CART_LIST);
  const { getCartList } = useGetCartList();

  const initialIdList = cartList.map((item) => item.id);

  const handleChangeAllCheckbox = () => {
    if (isAllChecked) {
      setIsAllChecked(false);
      setIsEachChecked(false);
      setCheckedIdList([]);
    } else {
      setIsAllChecked(true);
      setIsEachChecked(true);
      setCheckedIdList(initialIdList);
    }
  };

  const handleChangeEachCheckbox = (id, isChecked) => {
    let newCheckedIdList = [...checkedIdList];
    if (!isChecked) {
      newCheckedIdList.push(id);
    } else {
      newCheckedIdList = newCheckedIdList.filter((itemId) => itemId !== +id);
    }

    setCheckedIdList(newCheckedIdList);
  };

  const handleClickDeleteAllButton = async () => {
    await Promise.all(
      checkedIdList.map((targetId) => {
        return callDeleteApi(targetId);
      }),
    );

    await getCartList();
  };

  return (
    <Styled.Section>
      <Styled.TopWrapper>
        <Checkbox
          name="전체선택"
          checked={isAllChecked}
          onChange={handleChangeAllCheckbox}
        />
        <Styled.DeleteButton onClick={handleClickDeleteAllButton}>
          상품삭제
        </Styled.DeleteButton>
      </Styled.TopWrapper>

      <Styled.CartTitle>든든배송 상품({cartList.length}개)</Styled.CartTitle>
      <Styled.DivideLine />
      {cartList.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          onChangeEachCheckbox={handleChangeEachCheckbox}
          checked={isEachChecked}
        />
      ))}
    </Styled.Section>
  );
};

CartTable.propTypes = {
  cartList: PropTypes.array,
  checkedIdList: PropTypes.array,
  setCheckedIdList: PropTypes.func,
};

const Styled = {
  Section: styled.section`
    width: 60%;
    margin-top: 50px;
  `,

  TopWrapper: styled.div`
    display: flex;
    justify-content: space-between;
  `,

  CheckboxWrapper: styled.div`
    display: flex;
    align-items: center;
  `,

  Checkbox: styled.input`
    appearance: none;
    border: 1px solid #2ac1bc;
    border-radius: 2px;
    width: 25px;
    height: 25px;
    cursor: pointer;
    &:checked {
      background-color: #2ac1bc;
    }
    &::after {
      box-sizing: border-box;
      content: '✔';
      width: 25px;
      height: 25px;
      font-size: 0.75rem;
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `,

  CheckboxLabel: styled.label`
    padding-left: 7px;
  `,

  DeleteButton: styled.button`
    padding: 12px 22px;
    border: 1px solid #bbbbbb;
    cursor: pointer;
  `,

  CartTitle: styled.h3`
    display: flex;
    align-items: center;
    font-size: 20px;
  `,

  DivideLine: styled.hr`
    width: 100%;
    border: 2px solid #aaaaaa;
    margin-top: 10px;
    background-color: #aaaaaa;
  `,
};

export default CartTable;
