import BackArrow from "../Icon/BackArrow";
import * as S from "./Header.styled";

function Header({
  orderStatus,
  setIsOrderComplete,
}: {
  orderStatus: "order" | "order-complete" | "check-payment";
  setIsOrderComplete?: (value: boolean) => void;
}) {
  return (
    <S.HeaderContainer>
      <S.HeaderTitle>
        {orderStatus === "order-complete" ? (
          <S.HeaderIcon onClick={() => setIsOrderComplete?.(false)}>
            <BackArrow />
          </S.HeaderIcon>
        ) : orderStatus === "check-payment" ? (
          <></>
        ) : (
          "SHOP"
        )}
      </S.HeaderTitle>
    </S.HeaderContainer>
  );
}

export default Header;
