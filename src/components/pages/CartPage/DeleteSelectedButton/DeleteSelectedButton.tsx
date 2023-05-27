import { useRecoilValue, useSetRecoilState } from 'recoil';
import cartToggleState, { toggledProductsSelector } from '../../../../recoil/cartToggleState';
import cartState from '../../../../recoil/cartState';

import * as Styled from './DeleteSelectedButton.styled';

const DeleteSelectedButton = () => {
  const toggledProducts = useRecoilValue(toggledProductsSelector);
  const setToggles = useSetRecoilState(cartToggleState);
  const setCart = useSetRecoilState(cartState);

  const deleteToggledProducts = () => {
    toggledProducts.forEach(async (productId) => {
      try {
        const response = await fetch(`/cart-items/${productId}`, { method: 'DELETE' });

        if (response.status === 204) {
          setToggles((prev) => {
            const newToggles = { ...prev };
            delete newToggles[productId];
            return newToggles;
          });

          setCart((prev) => prev.filter(({ id }) => id !== productId));
        } else {
          throw new Error('상품 삭제에 실패하였습니다.');
        }
      } catch {
        alert(`일부 상품 삭제에 실패하였습니다.`);
      }
    });
  };

  return (
    <Styled.DeleteSelectedButton type="button" onClick={deleteToggledProducts}>
      선택 삭제
    </Styled.DeleteSelectedButton>
  );
};

export default DeleteSelectedButton;
