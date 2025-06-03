import { ArrowBackIcon, Button, Checkbox, Header, Info, Spacing, Text } from "@/components";
import Card from "@/components/Card/Card";
import { css } from "@emotion/react";
import { useNavigate } from "react-router";
import { ButtonWrapper, ReceiptTextWrapper } from "../Step1/Step1.styles";
import * as S from "./Step2.styles";
import { PATH } from "@/constants";
import Modal from "@/components/Modal/Modal";
import CouponModal from "./components/CouponModal";

const cartItem = {
  id: 1,
  name: "상품 이름",
  price: 10000,
  quantity: 2,
  product: {
    imageUrl: "/images/default-img.png",
    id: 1,
    name: "상품 이름",
    price: 10000,
  },
};

export default function OrderConfirmPage() {
  const navigate = useNavigate();

  const {
    product: { imageUrl, price, name },
    quantity,
  } = cartItem;

  const onTitleClick = () => {
    navigate(-1);
  };
  const handleOrderCompleteClick = () => {
    navigate(PATH.main);
  };

  const handleCouponApplyClick = () => {
    console.log("쿠폰 적용");
  };

  return (
    <div>
      <Header onClick={onTitleClick}>
        <ArrowBackIcon
          css={css`
            width: 24px;
            height: 24px;
            cursor: pointer;
          `}
        />
      </Header>

      <S.OrderConfirmPageWrapper>
        <Text variant="title-1">주문 확인</Text>
        <Spacing size={27} />
        <Text variant="body-1">
          총 1개의 상품 2개를 주문합니다.
          <br />
          최종 결제 금액을 확인해 주세요.
        </Text>
        <Card>
          <Card.Image src={imageUrl} alt={name} />
          <Card.Info>
            <Card.Name>{name}</Card.Name>
            <Card.Description>{price.toLocaleString()}원</Card.Description>
            <Text variant="body-1">{quantity}개</Text>
          </Card.Info>
        </Card>
        <Spacing size={16} />

        <Modal.Wrapper>
          <Modal.Trigger
            css={css`
              width: 100%;
            `}
          >
            <Button
              css={css`
                width: 100%;
              `}
              variant="outlined"
              onClick={handleCouponApplyClick}
            >
              쿠폰 적용
            </Button>
          </Modal.Trigger>
          <CouponModal />
        </Modal.Wrapper>

        <Spacing size={32} />
        <Text variant="title-3">배송 정보</Text>
        <Spacing size={16} />
        <S.CheckboxWrapper>
          <Checkbox checked />
          <Text variant="body-1">제주도 및 도서 산간 지역</Text>
        </S.CheckboxWrapper>
        <Spacing size={32} />
        <Text
          variant="body-1"
          css={css`
            display: flex;
            align-items: center;
            gap: 4px;
          `}
        >
          <Info /> 총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.
        </Text>
        <hr />
        <S.ReceiptWrapper>
          <ReceiptTextWrapper>
            <Text variant="title-3">주문 금액</Text>
            <Text variant="title-1">{price.toLocaleString()}원</Text>
          </ReceiptTextWrapper>
          <ReceiptTextWrapper>
            <Text variant="title-3">쿠폰 할인 금액</Text>
            <Text variant="title-1">{0}원</Text>
          </ReceiptTextWrapper>
          <ReceiptTextWrapper>
            <Text variant="title-3">배송비</Text>
            <Text variant="title-1">{0}원</Text>
          </ReceiptTextWrapper>

          <hr />

          <ReceiptTextWrapper>
            <Text variant="title-3">총 결제 금액</Text>
            <Text variant="title-1">{price.toLocaleString()}원</Text>
          </ReceiptTextWrapper>
        </S.ReceiptWrapper>
        <ButtonWrapper>
          <Button
            css={css`
              width: 100%;
            `}
            onClick={handleOrderCompleteClick}
          >
            <Text variant="title-3" color="white">
              결제하기
            </Text>
          </Button>
        </ButtonWrapper>
      </S.OrderConfirmPageWrapper>
    </div>
  );
}
