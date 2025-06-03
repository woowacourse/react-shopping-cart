import {
  Card,
  Modal,
  ArrowBackIcon,
  Button,
  Checkbox,
  Header,
  Info,
  Spacing,
  Text,
  useFunnelContext,
} from "@/components";
import { useCartItem } from "@/hooks";
import { CartItemService } from "@/services";
import { css } from "@emotion/react";
import { ButtonWrapper, ReceiptTextWrapper } from "../Step1/Step1.styles";
import { CouponModal } from "./components";
import * as S from "./Step2.styles";
import { useShoppingCartContext } from "../MainPage/context";

export default function Step2() {
  const { goPrevStep, goNextStep } = useFunnelContext();
  const { selectedItemIds, isFar, setIsFar } = useShoppingCartContext();

  const { cartItems } = useCartItem();
  const filteredCartItems = cartItems?.content.filter((item) => selectedItemIds.includes(item.id));

  const totalPrice = CartItemService.calculateTotalPrice(filteredCartItems);
  const deliveryFee = CartItemService.calculateDeliveryFee(totalPrice);
  const totalPriceWithDeliveryFee = CartItemService.calculateTotalPriceWithDeliveryFee(totalPrice);

  const totalType = CartItemService.calculateTotalType(filteredCartItems);
  const totalQuantity = CartItemService.calculateTotalQuantity(filteredCartItems);

  return (
    <div>
      <Header onClick={goPrevStep}>
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
          총 {totalType}종류의 상품 {totalQuantity}개를 주문합니다.
          <br />
          최종 결제 금액을 확인해 주세요.
        </Text>

        {filteredCartItems?.map((item) => (
          <Card key={item.id}>
            <Card.Image src={item.product.imageUrl} alt={item.product.name} />
            <Card.Info>
              <Card.Name>{item.product.name}</Card.Name>
              <Card.Description>{item.product.price.toLocaleString()}원</Card.Description>
              <Text variant="body-1">{item.quantity}개</Text>
            </Card.Info>
          </Card>
        ))}

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
          <Checkbox checked={isFar} onClick={() => setIsFar(!isFar)} />
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
            {/* <Text variant="title-1">{price.toLocaleString()}원</Text> */}
          </ReceiptTextWrapper>
          <ReceiptTextWrapper>
            <Text variant="title-3">쿠폰 할인 금액</Text>
            <Text variant="title-1">{}원</Text>
          </ReceiptTextWrapper>
          <ReceiptTextWrapper>
            <Text variant="title-3">배송비</Text>
            <Text variant="title-1">{deliveryFee.toLocaleString()}원</Text>
          </ReceiptTextWrapper>

          <hr />

          <ReceiptTextWrapper>
            <Text variant="title-3">총 결제 금액</Text>
            <Text variant="title-1">{totalPriceWithDeliveryFee.toLocaleString()}원</Text>
          </ReceiptTextWrapper>
        </S.ReceiptWrapper>
        <ButtonWrapper>
          <Button
            css={css`
              width: 100%;
            `}
            onClick={goNextStep}
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
