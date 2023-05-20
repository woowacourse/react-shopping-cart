import { styled } from 'styled-components';
import { useCartState } from '../recoils/recoilCart';
import { useCheckedState } from '../recoils/recoilChecked';
import { Checkbox } from './styled';

export const CartActions = () => {
  const [cart] = useCartState();
  const [checkedState, setCheckedState] = useCheckedState();

  const onChangeAllCheckbox = () => {
    setCheckedState((prev) => {
      const a: any = {};
      for (const product of cart) {
        a[product.id] = !prev.all;
      }

      return {
        ...a,
        all: !prev.all,
      };
    });
  };

  return (
    <Style.SelectionActions>
      <Style.ToggleAllCheckBox>
        <Style.Checkbox type="checkbox" checked={checkedState.all} onChange={onChangeAllCheckbox} />
        <span>
          전체선택 ({Object.keys(checkedState).length - 1}/{cart.length})
        </span>
      </Style.ToggleAllCheckBox>
      <button>선택삭제</button>
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
};
