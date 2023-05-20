import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { TRASH_BIN } from '../../../../assets';
import { productCountSelector } from '../../../../recoil/cartState';
import { productToggleSelector } from '../../../../recoil/cartToggleState';

interface CartDeleteButtonProps {
  productId: number;
  productName: string;
}

const CartDeleteButton = (props: CartDeleteButtonProps) => {
  const { productId, productName } = props;

  const updateProductQuantity = useSetRecoilState(productCountSelector(productId));
  const deleteToggled = useResetRecoilState(productToggleSelector(productId));

  const deleteProduct = () => {
    fetch(`/cart-items/${productId}`, { method: 'DELETE' });
    updateProductQuantity(0);
    deleteToggled();
  };

  return (
    <button
      type="button"
      aria-label={`장바구니에서 ${productName} 삭제하기`}
      onClick={deleteProduct}
    >
      <TRASH_BIN aria-hidden />
    </button>
  );
};

export default CartDeleteButton;
