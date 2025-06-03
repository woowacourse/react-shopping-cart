import { ROUTES } from "@/shared/config/routes";
import * as S from "./CartNavigateButton.styled";

export default function CartNavigateButton() {
  return (
    <S.CartNavigateButton to={ROUTES.CART}>
      장바구니로 이동
    </S.CartNavigateButton>
  );
}
