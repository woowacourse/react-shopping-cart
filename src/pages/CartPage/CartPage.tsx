import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FooterButton from "../../components/FooterButton/FooterButton";
import Header from "../../components/@common/Header/Header";
import Title from "../../components/@common/Title/Title";
import useCart from "../../hooks/useCart";
import useToast from "../../hooks/useToast";
import * as S from "./CartPage.styles";
import InfoIcon from "/info.svg";
import { TOAST_TYPES } from "../../components/@common/Toast/type";
import EmptyFallback from "../../components/@common/Fallback/Empty/EmptyFallback";
import { CLIENT_BASE_PATH } from "../../apis/config";
import PriceSummary from "../../components/PriceSummary/PriceSummary";
import CartContainer from "../../components/CartContainer/CartContainer";
import InfoMessage from "../../components/InfoMessage/InfoMessage";

const CartPage = () => {
  const { hasCheckedItem, cartItemCount, errorMessage } = useCart();

  const { showToast } = useToast();

  useEffect(() => {
    showToast({ message: errorMessage, type: TOAST_TYPES.ERROR });
  }, [errorMessage, showToast]);

  const navigate = useNavigate();

  const navigateToOrderPage = () => {
    navigate("/order");
  };

  return (
    <>
      <Header>
        <S.Logo href={CLIENT_BASE_PATH}>SHOP</S.Logo>
      </Header>
      <S.Main>
        <Title>장바구니</Title>
        {cartItemCount > 0 ? (
          <S.ContentContainer>
            <InfoMessage
              message={`현재 ${cartItemCount}종류의 상품이 담겨있습니다.`}
            />
            <CartContainer />
            <InfoMessage
              message={`총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.`}
              imageSrc={InfoIcon}
              imageAlt="info"
            />
            <PriceSummary />
          </S.ContentContainer>
        ) : (
          <EmptyFallback />
        )}
      </S.Main>
      <FooterButton
        disabled={cartItemCount === 0 || !hasCheckedItem()}
        onClick={navigateToOrderPage}
        tabIndex={0}
      >
        주문 확인
      </FooterButton>
    </>
  );
};

export default CartPage;
