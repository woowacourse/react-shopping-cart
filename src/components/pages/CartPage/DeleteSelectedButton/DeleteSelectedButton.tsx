import { useRecoilValue, useSetRecoilState } from 'recoil';
import cartToggleState, { toggledProductsSelector } from '../../../../recoil/cartToggleState';
import cartState from '../../../../recoil/cartState';

import * as Styled from './DeleteSelectedButton.styled';

const DeleteSelectedButton = () => {
  const toggledProducts = useRecoilValue(toggledProductsSelector);
  const setToggles = useSetRecoilState(cartToggleState);
  const setCart = useSetRecoilState(cartState);

  const deleteToggledProducts = () => {
    toggledProducts.forEach((id) => {
      fetch(`/cart-items/${id}`, { method: 'DELETE' });
    });

    setToggles((prev) => {
      const cur: Record<number, boolean> = {};

      Object.keys(prev)
        .map(Number)
        .forEach((id) => {
          if (!toggledProducts.includes(id)) cur[id] = false;
        });

      return cur;
    });

    setCart((prev) => prev.filter(({ id }) => !toggledProducts.includes(Number(id))));
  };

  return (
    <Styled.DeleteSelectedButton type="button" onClick={deleteToggledProducts}>
      선택 삭제
    </Styled.DeleteSelectedButton>
  );
};

export default DeleteSelectedButton;
