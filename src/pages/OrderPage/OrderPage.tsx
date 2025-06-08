import { FooterButton } from "../../components/FooterButton/FooterButton.styles";
import Header from "../../components/@common/Header/Header";
import BackIcon from "/left-arrow.svg";
import * as S from "./OrderPage.styles";
import useCart from "../../hooks/useCart";
import { useNavigate } from "react-router-dom";
import useCartCalculations from "../../hooks/useCartCaculations";
import InfoMessage from "../../components/InfoMessage/InfoMessage";
import PriceSummary from "../../components/PriceSummary/PriceSummary";
import Checkbox from "../../components/@common/Checkbox/Checkbox";
import Description from "../../components/@common/Description/Description";
import InfoIcon from "/Info.svg";
import { useState } from "react";
import CouponModal from "../../CouponModal/CouponModal";
import Title from "../../components/@common/Title/Title";
import useToast from "../../hooks/useToast";

const IMG_BASE_URL = "/react-shopping-cart";
const DEFAULT_IMAGE_URL = "/planet-default-image.svg";

const OrderPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { orderItemCount, cartItemsCheckData, setIsRemoteArea, isRemoteArea } =
    useCart();
  const { orderQuantity } = useCartCalculations();

  const { showToast } = useToast();

  const navigate = useNavigate();

  const navigateToBack = () => {
    navigate(-1);
  };

  const handleModalOpen = async () => {
    try {
      setIsOpen(true);
    } catch (error) {
      showToast({
        message: "쿠폰을 불러오는 데 실패했습니다.",
        type: "error",
      });
    }
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  const handleRemoteCheckbox = () => {
    setIsRemoteArea((prev) => !prev);
  };

  return (
    <>
      <Header>
        <S.BackIcon
          role="button"
          src={BackIcon}
          alt="back-icon"
          onClick={navigateToBack}
          tabIndex={0}
        />
      </Header>
      <S.Main>
        <Title>주문 확인</Title>
        <S.DescriptionContainer>
          <InfoMessage
            message={`총 ${orderItemCount}종류의 상품 ${orderQuantity}개를 주문합니다.`}
          />
          <InfoMessage message={`최종 결제 금액을 확인해 주세요.`} />
        </S.DescriptionContainer>
        <S.CartItemsContainer>
          {cartItemsCheckData
            .filter((item) => item.checked)
            .map((item) => (
              <S.CartItemWrapper key={item.id}>
                <S.CartItemImageWrapper>
                  <S.CartItemImage
                    src={
                      item.imageUrl
                        ? item.imageUrl
                        : IMG_BASE_URL + DEFAULT_IMAGE_URL
                    }
                    alt={item.name}
                  />
                </S.CartItemImageWrapper>
                <S.CartItemInfo>
                  <S.CartItemName>{item.name}</S.CartItemName>
                  <S.CartItemPrice>
                    {item.price.toLocaleString()}원
                  </S.CartItemPrice>
                  <div>{item.quantity}개</div>
                </S.CartItemInfo>
              </S.CartItemWrapper>
            ))}
        </S.CartItemsContainer>
        <S.ButtonContainer>
          <S.Button onClick={handleModalOpen}>쿠폰 적용</S.Button>
        </S.ButtonContainer>
        <CouponModal isOpen={isOpen} onClose={handleModalClose} />
        <S.ShippingInfo>
          <S.Label>배송 정보</S.Label>
          <S.CheckboxContainer>
            <Checkbox checked={isRemoteArea} onClick={handleRemoteCheckbox} />
            <Description>제주도 및 도서 산간 지역</Description>
          </S.CheckboxContainer>
        </S.ShippingInfo>
        <InfoMessage
          message={`총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.`}
          imageSrc={InfoIcon}
          imageAlt="info"
        />
        <PriceSummary showDiscount />
      </S.Main>
      <FooterButton disabled={true}>결제하기</FooterButton>
    </>
  );
};

export default OrderPage;
