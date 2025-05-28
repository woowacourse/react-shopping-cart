import RemoveCartItemIcon from '@assets/icons/remove-cart-item.svg';
import * as S from './RemoveCartItemButton.styled';

type RemoveCartItemButtonProps = {
  cartItemId: number;
}
};

function RemoveCartItemButton({ cartItemId }: RemoveCartItemButtonProps) {
  return (
    <>
      <S.Button type="button" onClick={() => {}}>
        <img src={RemoveCartItemIcon} alt="장바구니에서 제거" />
      </S.Button>
    </>
  );
}

export default RemoveCartItemButton;
