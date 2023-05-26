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

  const deleteProduct = async () => {
    try {
      const response = await fetch(`/cart-items/${productId}`, { method: 'DELETE' });

      if (response.ok) {
        updateProductQuantity(0);
        deleteToggled();
      } else {
        throw new Error('상품 삭제에 실패하였습니다.');
      }
    } catch {
      alert(`${productName} 상품 삭제에 실패하였습니다.`);
    }
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
