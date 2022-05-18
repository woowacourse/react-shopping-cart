import styled from 'styled-components';
import PropTypes from 'prop-types';
import CartItem from 'components/CartItem';

const CartTable = ({ cartList }) => {
  return (
    <Styled.Section>
      <Styled.TopWrapper>
        <Styled.CheckboxWrapper>
          <Styled.Checkbox
            name="checkbox"
            type="checkbox"
            checked="true"
          ></Styled.Checkbox>
          <Styled.CheckboxLabel for="checkbox">전체선택</Styled.CheckboxLabel>
        </Styled.CheckboxWrapper>
        <Styled.DeleteButton>상품삭제</Styled.DeleteButton>
      </Styled.TopWrapper>

      <Styled.CartTitle>든든배송 상품({cartList.length}개)</Styled.CartTitle>
      <Styled.DivideLine />
      {cartList.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
    </Styled.Section>
  );
};

CartTable.propTypes = {
  cartList: PropTypes.array,
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
