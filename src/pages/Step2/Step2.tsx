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
import { CartItemService, CouponService } from "@/services";
import { css } from "@emotion/react";
import { ButtonWrapper, ReceiptTextWrapper } from "../Step1/Step1.styles";
import { CouponModal } from "./components";
import * as S from "./Step2.styles";
import { useShoppingCartContext } from "../MainPage/context";
import { QUERY_KEY } from "@/constants";
import { useQuery } from "@/modules";
import { CouponApi } from "@/apis";
import { useEffect, useMemo, useState } from "react";

export default function Step2() {
  const { goPrevStep, goNextStep } = useFunnelContext();
  const { selectedItemIds, isFar, setIsFar, selectedCouponIds, setSelectedCouponIds } = useShoppingCartContext();
  const { data: coupons } = useQuery({
    queryFn: CouponApi.getAllCoupons,
    queryKey: QUERY_KEY.coupon,
    initialData: [],
  });
  const [isOpen, setIsOpen] = useState(false);

  const { cartItems } = useCartItem();
  const selectedCartItems = cartItems?.content.filter((item) => selectedItemIds.includes(item.id));

  const cartItemService = new CartItemService(selectedCartItems ?? []);
  const deliveryFee = cartItemService.calculateDeliveryFee(isFar);
  const totalPrice = cartItemService.calculateTotalPrice();

  const totalType = cartItemService.calculateTotalType();
  const totalQuantity = cartItemService.calculateTotalQuantity();

  const selectedCoupons = coupons?.filter((coupon) => selectedCouponIds.includes(coupon.id));

  const totalDiscountPrice = CouponService.calculateTotalDiscountPrice(selectedCartItems, selectedCoupons, isFar);

  const closeModal = () => setIsOpen(false);

  const availableCoupons = useMemo(
    () => coupons?.filter((coupon) => new CouponService(selectedCartItems).canAdjustCoupon(coupon)),
    [coupons],
  );

  useEffect(() => {
    const mostDiscountCombination = CouponService.calculateMostDiscountCombination(
      selectedCartItems,
      availableCoupons,
      isFar,
    );

    setSelectedCouponIds(mostDiscountCombination?.map((coupon) => coupon.id) || []);
  }, [availableCoupons]);

  return (
    <main>
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
        <Spacing size={28} />
        <Text variant="body-1">
          총 {totalType}종류의 상품 {totalQuantity}개를 주문합니다.
          <br />
          최종 결제 금액을 확인해 주세요.
        </Text>
        <Spacing size={28} />

        {selectedCartItems?.map((item) => (
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

        <Button
          css={css`
            width: 100%;
          `}
          variant="outlined"
          onClick={() => setIsOpen(true)}
        >
          쿠폰 적용
        </Button>

        <Modal.Wrapper isOpen={isOpen} onClose={closeModal}>
          <CouponModal closeModal={closeModal} />
        </Modal.Wrapper>

        <Spacing size={32} />
        <Text variant="title-3">배송 정보</Text>
        <Spacing size={16} />
        <S.CheckboxWrapper onClick={() => setIsFar(!isFar)}>
          <Checkbox checked={isFar} />
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
            <Text variant="title-1">{totalPrice.toLocaleString()}원</Text>
          </ReceiptTextWrapper>
          <ReceiptTextWrapper>
            <Text variant="title-3">쿠폰 할인 금액</Text>
            <Text variant="title-1">{totalDiscountPrice?.toLocaleString()}원</Text>
          </ReceiptTextWrapper>
          <ReceiptTextWrapper>
            <Text variant="title-3">배송비</Text>
            <Text variant="title-1">{deliveryFee.toLocaleString()}원</Text>
          </ReceiptTextWrapper>

          <hr />

          <ReceiptTextWrapper>
            <Text variant="title-3">총 결제 금액</Text>
            <Text variant="title-1">{(totalPrice - totalDiscountPrice + deliveryFee).toLocaleString()}원</Text>
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
    </main>
  );
}
