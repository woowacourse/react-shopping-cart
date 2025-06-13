import RemoveCartItemIcon from "@assets/icons/remove-cart-item.svg";
import * as S from "./RemoveCartItemButton.styled";

type RemoveCartItemButtonProps = {
  id: number;
  onClick: (id: number) => Promise<void>;
};

function RemoveCartItemButton({ id, onClick }: RemoveCartItemButtonProps) {
  return (
    <>
      <S.Button type="button" onClick={() => onClick(id)}>
        <img src={RemoveCartItemIcon} alt="장바구니에서 제거" />
      </S.Button>
    </>
  );
}

export default RemoveCartItemButton;
