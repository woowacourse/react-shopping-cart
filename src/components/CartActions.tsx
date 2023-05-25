import { styled } from 'styled-components';

import { useCartStateValue } from '../recoils/recoilCart';
import { useCheckedState } from '../recoils/recoilChecked';
import { useUpdateCart } from '../hooks/useUpdateCart';

import { Checkbox } from './styled';

import { CheckedStateType } from '../types';

export const CartActions = () => {
  const cart = useCartStateValue();
  const { deleteCartItem } = useUpdateCart();
  const [checkedState, setCheckedState] = useCheckedState();

  const onChangeAllCheckbox = () => {
    setCheckedState((prev) => {
      const updatedCheckedState: CheckedStateType = {
        all: !prev.all,
      };

      if (!prev.all) {
        for (const item of cart) {
          updatedCheckedState[item.id] = true;
        }
      }

      return updatedCheckedState;
    });
  };

  const onClickDeleteSelectedItemButton = () => {
    const { all, ...selectedItems } = checkedState;
    const targetItemsId = Object.keys(selectedItems).map(Number);

    deleteCartItem(...targetItemsId);

    setCheckedState({ all: false });
  };

  return (
    <Style.SelectionActions>
      <Style.ToggleAllCheckBox>
        <Style.Checkbox type="checkbox" checked={checkedState.all} onChange={onChangeAllCheckbox} />
        <span>
          전체선택 ({Object.keys(checkedState).length - 1}/{cart.length})
        </span>
      </Style.ToggleAllCheckBox>
      <Style.DeleteSelectedItemButton onClick={onClickDeleteSelectedItemButton}>
        선택삭제
      </Style.DeleteSelectedItemButton>
    </Style.SelectionActions>
  );
};

const Style = {
  SelectionActions: styled.div`
    display: flex;
    align-items: center;

    column-gap: 15px;

    @media screen and (max-width: 500px) {
      width: 100%;

      justify-content: space-between;
    }
  `,

  ToggleAllCheckBox: styled.div`
    display: flex;
    align-items: center;

    & > input {
      margin-right: 15px;
    }
  `,

  Checkbox: styled(Checkbox)``,

  DeleteSelectedItemButton: styled.button`
    width: 70px;
    height: 30px;
    border: 1px solid var(--grey-300);

    background-color: var(--grey-100);

    border-radius: 8px;

    font-weight: 600;
    cursor: pointer;

    &:hover {
      background-color: var(--grey-200);
    }
  `,
};
