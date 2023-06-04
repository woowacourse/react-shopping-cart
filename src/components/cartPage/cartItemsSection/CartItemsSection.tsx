import styled from 'styled-components';
import { CartItemList } from './CartItemList';
import { selector, useRecoilState, useRecoilValue } from 'recoil';
import {
  cartItemsState,
  selectedCartIdListState,
} from '../../../recoil/atoms/cartAtom';
import { CheckBox } from '../../common/checkBox/CheckBox';
import { useCartRecoil } from '../../../hooks/recoil/useCartRecoil';
import { useCartFetch } from '../../../hooks/fetch/useCartFetch';

const isAllCheckBoxSelectedState = selector({
  key: 'isAllCheckBoxSelectedState',
  get: ({ get }) => {
    const cartItems = get(cartItemsState);
    const selectedCartIdList = get(selectedCartIdListState);

    return (
      cartItems.filter((cartItem) => !selectedCartIdList.includes(cartItem.id))
        .length === 0
    );
  },
});

export const CartItemsSection = () => {
  const cartItems = useRecoilValue(cartItemsState);
  const isAllCheckBoxChecked = useRecoilValue(isAllCheckBoxSelectedState);
  const [selectedCartIdList, setSelectedCartIdList] = useRecoilState(
    selectedCartIdListState
  );

  const { deleteRecoilCartById, getCartItemIdList } = useCartRecoil();
  const { deleteCartItemById } = useCartFetch();

  const deleteSelectedProduct = () => {
    selectedCartIdList.forEach((selectedCartId) => {
      deleteRecoilCartById(selectedCartId);
      deleteCartItemById(selectedCartId);
    });
  };

  const toggleAllCheckBoxChecked: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    if (e.target.checked)
      return setSelectedCartIdList(() => getCartItemIdList());
    setSelectedCartIdList(() => []);
  };

  return (
    <Style.Container>
      <Style.Header>
        <Style.HeaderTitle>배송상품 ({cartItems.length}개)</Style.HeaderTitle>
      </Style.Header>
      <CartItemList cartItemList={cartItems} />
      <Style.SelectOrDeleteContainer>
        <CheckBox
          isChecked={isAllCheckBoxChecked}
          id={Math.random()}
          handleClickCheckBox={toggleAllCheckBoxChecked}
        />
        <Style.SelectedProductCount>
          전체선택 ({selectedCartIdList.length}/{cartItems.length})
        </Style.SelectedProductCount>
        <Style.DeleteSelectedProductButton onClick={deleteSelectedProduct}>
          선택삭제
        </Style.DeleteSelectedProductButton>
      </Style.SelectOrDeleteContainer>
    </Style.Container>
  );
};

const Style = {
  Container: styled.section`
    width: 740px;
    min-height: 704px;

    display: flex;
    flex-direction: column;
  `,
  Header: styled.div`
    width: 100%;
    height: 56px;

    border-bottom: 4px solid #aaaaaa;
  `,
  HeaderTitle: styled.h2`
    font-size: 20px;
    color: #333333;
  `,
  SelectOrDeleteContainer: styled.div`
    display: flex;
    align-items: center;
    gap: 13px;

    margin-top: 23px;
  `,
  CheckBox: styled.div`
    width: 28px;
    height: 28px;

    border: 1px solid #22a6a2;
  `,
  SelectedProductCount: styled.span`
    font-size: 16px;
  `,
  DeleteSelectedProductButton: styled.button`
    width: 98px;
    height: 35px;

    display: flex;
    justify-content: center;
    align-items: center;

    border: 1px solid #bbbbbb;
    font-family: var(--baemin-font);
  `,
};
