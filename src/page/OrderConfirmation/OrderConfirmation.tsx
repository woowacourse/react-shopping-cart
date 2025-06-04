import { CartItem } from "@/type/CartItem";
import OrderConfirmationList from "@/components/OrderConfirmation/OrderConfirmationList/OrderConfirmationList";

import OrderConfirmationPreviewCard from "@/components/OrderConfirmation/OrderConfirmationPreviewCard/OrderConfirmationPreviewCard";
import * as Styled from "./OrderConfirmation.style";
import * as CartListStyled from "@/components/Cart/CartList/CartList.style";

import CouponList from "@/components/Coupon/CouponList/CouponList";
import CouponItem from "@/components/Coupon/CouponItem/CouponItem";

import {
  useMemo,
  useState,
  createContext,
  useContext,
  ReactNode,
  PropsWithChildren,
} from "react";
import Modal from "@/components/common/Modal/Modal";

import type { Coupon } from "@/type/Coupon";
import { validateCoupon } from "@/util/coupon/validateCoupon";
import { CouponDiscountResult } from "@/hooks/Coupon/useCouponDiscount";
import { UseCouponSelectionReturn } from "@/hooks/Coupon/useCouponSelection";
import CheckBox from "@/components/common/CheckBox";
import { FREE_SHIPPING_OVER } from "@/constants/priceSetting";
import notice from "/notice.svg";

// Context 정의
interface OrderConfirmationContextValue {
  selectedCartItems: CartItem[];
  couponsData: Coupon[] | null;
  result: CouponDiscountResult;
  couponSelection: UseCouponSelectionReturn;
  invalidCoupons?: Coupon[];
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
}

export const OrderConfirmationContext =
  createContext<OrderConfirmationContextValue | null>(null);

const useOrderConfirmationContext = () => {
  const context = useContext(OrderConfirmationContext);
  if (!context) {
    throw new Error("OrderConfirmation 컴포넌트 내에서만 사용할 수 있습니다.");
  }
  return context;
};

interface OrderConfirmationProps {
  selectedCartItems: CartItem[];
  couponsData: Coupon[] | null;
  result: CouponDiscountResult;
  couponSelection: UseCouponSelectionReturn;
  children: ReactNode;
}

function OrderConfirmation({
  selectedCartItems,
  couponsData,
  result,
  couponSelection,
  children,
}: OrderConfirmationProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const invalidCoupons = useMemo(
    () =>
      couponsData?.filter((c) => !validateCoupon(c, selectedCartItems).isValid),
    [couponsData, selectedCartItems]
  );

  const contextValue: OrderConfirmationContextValue = {
    selectedCartItems,
    couponsData,
    result,
    couponSelection,
    invalidCoupons,
    isModalOpen,
    setIsModalOpen,
  };

  return (
    <OrderConfirmationContext.Provider value={contextValue}>
      <Styled.OrderConfirmationContainer>
        {children}
      </Styled.OrderConfirmationContainer>
    </OrderConfirmationContext.Provider>
  );
}

function Header() {
  const { selectedCartItems } = useOrderConfirmationContext();

  const totalQuantity = selectedCartItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  return (
    <Styled.Header>
      <Styled.HeaderTitle>주문 확인</Styled.HeaderTitle>
      <Styled.HeaderDescription>
        <span>
          총 {selectedCartItems.length}종류의 상품 {totalQuantity}개를
          주문합니다.
        </span>
        <span>최종 결제 금액을 확인해주세요.</span>
      </Styled.HeaderDescription>
    </Styled.Header>
  );
}

function ItemList() {
  const { selectedCartItems } = useOrderConfirmationContext();

  return (
    <OrderConfirmationList>
      {selectedCartItems.map((cartItem) => (
        <OrderConfirmationPreviewCard key={cartItem.id} cartItem={cartItem} />
      ))}
    </OrderConfirmationList>
  );
}

function CouponSelection({ children }: PropsWithChildren) {
  const {
    couponsData,
    result,
    couponSelection,
    invalidCoupons,
    isModalOpen,
    setIsModalOpen,
  } = useOrderConfirmationContext();

  const { handleSelectCoupon, selectedCouponIds, isSelectedToLimit } =
    couponSelection;

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        position="center"
      >
        <Modal.Background>
          <Modal.Container size="small" position="center">
            <Modal.Header>쿠폰을 선택해 주세요.</Modal.Header>
            <Modal.Content>
              <CouponList>
                {couponsData?.map((coupon) => {
                  const isSelected = !!selectedCouponIds?.has(coupon.id);
                  const isLimitReachedForThisCoupon =
                    !isSelected && isSelectedToLimit;

                  return (
                    <CouponItem
                      key={coupon.id}
                      coupon={coupon}
                      onSelect={handleSelectCoupon}
                      isSelected={isSelected}
                      isLimitReached={isLimitReachedForThisCoupon}
                      isInvalid={invalidCoupons?.some(
                        (invalidCoupon) => invalidCoupon.id === coupon.id
                      )}
                    />
                  );
                })}
              </CouponList>
              <Styled.CouponComboNotice>
                🏷️ 자동으로 가장 큰 할인 금액의 쿠폰이 적용됩니다!
              </Styled.CouponComboNotice>
              <Styled.CouponButton onClick={() => setIsModalOpen(false)}>
                총 {result.discountTotal.toLocaleString()}원 할인쿠폰 사용하기
              </Styled.CouponButton>
            </Modal.Content>
          </Modal.Container>
        </Modal.Background>
      </Modal>

      {children || (
        <Styled.CouponButton onClick={() => setIsModalOpen(true)}>
          쿠폰 적용
        </Styled.CouponButton>
      )}
    </>
  );
}

function ShippingIsland() {
  const [isInIsland, setIsInIsland] = useState(false);
  return (
    <Styled.ShippingIsland>
      <Styled.ShippingIslandTitle>배송 정보</Styled.ShippingIslandTitle>
      <Styled.ShippingIslandWrapper>
        <CheckBox
          id="isInIsland"
          checked={isInIsland}
          onChange={() => setIsInIsland(!isInIsland)}
          label="제주도 및 도서 산간 지역"
          hidden={true}
        />
        <Styled.ShippingIslandDescription>
          제주도 및 도서 산간 지역
        </Styled.ShippingIslandDescription>
      </Styled.ShippingIslandWrapper>
      <CartListStyled.Notice>
        <CartListStyled.NoticeIcon src={notice} />
        <CartListStyled.FreeShippingText>
          총 주문 금액이 {FREE_SHIPPING_OVER.toLocaleString()}원 이상일 경우
          무료 배송됩니다.
        </CartListStyled.FreeShippingText>
      </CartListStyled.Notice>
    </Styled.ShippingIsland>
  );
}
function PriceDetails() {
  const { result } = useOrderConfirmationContext();

  return (
    <Styled.OrderPriceDetailWrapper>
      <Styled.OrderPriceDetails>
        <Styled.OrderWrapper>
          <Styled.OrderTotalTitle>총 결제 금액</Styled.OrderTotalTitle>
          <Styled.OrderTotalPrice>
            {result.orderTotal.toLocaleString()}원
          </Styled.OrderTotalPrice>
        </Styled.OrderWrapper>
        <Styled.OrderWrapper>
          <Styled.DiscountTotalTitle>쿠폰 할인 금액</Styled.DiscountTotalTitle>
          <Styled.DiscountTotalPrice>
            -{result.discountTotal.toLocaleString()}원
          </Styled.DiscountTotalPrice>
        </Styled.OrderWrapper>
        <Styled.OrderWrapper>
          <Styled.OrderTotalTitle>배송비</Styled.OrderTotalTitle>
          <Styled.OrderTotalPrice>
            {result.shippingFee.toLocaleString()}원
          </Styled.OrderTotalPrice>
        </Styled.OrderWrapper>
      </Styled.OrderPriceDetails>
      <Styled.FinalTotalWrapper>
        <Styled.FinalTotalTitle>총 결제 금액</Styled.FinalTotalTitle>
        <Styled.FinalTotalPrice>
          {result.finalTotal.toLocaleString()}원
        </Styled.FinalTotalPrice>
      </Styled.FinalTotalWrapper>
    </Styled.OrderPriceDetailWrapper>
  );
}

OrderConfirmation.Header = Header;
OrderConfirmation.ItemList = ItemList;
OrderConfirmation.CouponSelection = CouponSelection;
OrderConfirmation.ShippingIsland = ShippingIsland;
OrderConfirmation.PriceDetails = PriceDetails;

export default OrderConfirmation;
