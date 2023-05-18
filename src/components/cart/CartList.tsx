import { useRecoilValue } from 'recoil';
import { cartState } from '../../store/CartState';
import CartListItem from './CartListItem';
import { styled } from 'styled-components';
import Checkbox, { CheckboxStyle } from './Checkbox';
import PriceWrapper from './PriceWrapper';
import { useHandleCartList } from '../../hooks/useHandleCartList';

const CartList = () => {
  const cart = useRecoilValue(cartState);
  const {
    checkedItems,
    totalPrice,
    handleCheckAllItems,
    handleCheckedItem,
    handleRemoveCheckedItem,
  } = useHandleCartList();

  return (
    <>
      <S.Title>장바구니</S.Title>
      <S.Wrapper>
        <S.ItemListWrapper>
          <S.CheckboxAllWrapper>
            <S.CheckboxAll
              type="checkbox"
              id={'all'}
              onClick={handleCheckAllItems}
              checked={checkedItems.length === cart.length}
            />
            <label htmlFor={'all'}>{`전체 ${cart.length}`}</label>
            <S.RemoveSelectedButton onClick={handleRemoveCheckedItem}>
              선택 삭제
            </S.RemoveSelectedButton>
          </S.CheckboxAllWrapper>
          {cart.map((cartItem) => (
            <S.ItemWrapper>
              <Checkbox
                onChange={handleCheckedItem(cartItem.id)}
                isChecked={checkedItems.includes(cartItem.id)}
              />
              <CartListItem item={cartItem} />
            </S.ItemWrapper>
          ))}
        </S.ItemListWrapper>
        <PriceWrapper totalPrice={totalPrice} />
      </S.Wrapper>
    </>
  );
};

const S = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    position: relative;
    gap: 100px;
  `,

  ItemListWrapper: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    width: 736px;
    height: 700px;
    overflow: scroll;

    & > :first-child {
      position: absolute;
      left: 0;
    }

    & > :nth-child(2) {
      margin-top: 40px;
      border-top: 4px solid #aaa;
    }

    & > :last-child {
      border-bottom: none;
    }
  `,

  CheckboxAllWrapper: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 40px;
    gap: 10px;
    font-size: 24px;
  `,

  ItemWrapper: styled.div`
    display: flex;
    flex-direction: row;

    & > :first-child {
      position: relative;
      left: 20px;
      margin-top: 85px;
      margin-left: 20px;
    }

    & > :nth-child(even) {
      border-bottom: 1.5px solid #ccc;
    }
  `,

  RemoveSelectedButton: styled.button`
    border: 1px solid black;
    padding: 5px;
    border-radius: 7px;
    cursor: pointer;
  `,

  Title: styled.h1`
    text-align: center;
    font-size: 32px;
    font-weight: 700;
  `,

  CheckboxAll: styled(CheckboxStyle)``,
};
export default CartList;
