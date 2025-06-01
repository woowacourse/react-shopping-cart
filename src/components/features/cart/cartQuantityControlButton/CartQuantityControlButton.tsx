import { IconButton } from '@/components/common';
import { CartActionType } from './CartQuantityControlButton.types';

const ICON_SRC_MAP = {
  plus: './assets/Plus.svg',
  minus: './assets/Minus.svg',
  delete: './assets/DeleteCart.svg',
};

const ALT_TEXT_MAP = {
  plus: '수량 증가 버튼',
  minus: '수량 감소 버튼',
  delete: '상품 삭제 버튼',
};

interface CartQuantityControlButtonProps {
  actionType: CartActionType;
  onClick: () => void;
}

function CartQuantityControlButton({
  actionType,
  onClick,
}: CartQuantityControlButtonProps) {
  return (
    <IconButton
      iconSrc={ICON_SRC_MAP[actionType]}
      alt={ALT_TEXT_MAP[actionType]}
      onClick={onClick}
    />
  );
}

export default CartQuantityControlButton;
