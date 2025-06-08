import { CartItem } from "@/type/CartItem";
import * as Styled from "./OrderConfirmation.style";
import * as CartListStyled from "@/components/Cart/CartList/CartList.style";

import OrderConfirmationList from "@/components/OrderConfirmation/OrderConfirmationList/OrderConfirmationList";
import OrderConfirmationPreviewCard from "@/components/OrderConfirmation/OrderConfirmationPreviewCard/OrderConfirmationPreviewCard";

import CouponList from "@/components/Coupon/CouponList/CouponList";
import CouponItem from "@/components/Coupon/CouponItem/CouponItem";

import {
  useMemo,
  useState,
  createContext,
  useContext,
  PropsWithChildren,
} from "react";
import Modal from "@/components/common/Modal/Modal";

import type { Coupon } from "@/type/Coupon";
import { validateCoupon } from "@/util/coupon/validateCoupon";
import { CouponDiscountResult } from "@/hooks/Coupon/useCouponDiscount";
import { UseCouponSelectionReturn } from "@/hooks/Coupon/useCouponSelection";
import CheckBox from "@/components/common/CheckBox";
import {
  FREE_SHIPPING_OVER,
  ISLAND_ADDITIONAL_SHIPPING_FEE,
} from "@/constants/priceSetting";
import noticeIcon from "/notice.svg";

interface OrderConfirmationContextValue {
  selectedCartItems: CartItem[];
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  isInIsland: boolean;
  setIsInIsland: (inIsland: boolean) => void;
  couponsData: Coupon[] | null;
  couponSelection: UseCouponSelectionReturn;
  result: CouponDiscountResult;
  invalidCoupons: Coupon[] | undefined;
}

export const OrderConfirmationContext =
  createContext<OrderConfirmationContextValue | null>(null);

const useOrderConfirmationContext = () => {
  const context = useContext(OrderConfirmationContext);
  if (!context) {
    throw new Error(
      "useOrderConfirmationContext는 OrderConfirmationContext 안에서만 사용할 수 있습니다."
    );
  }
  return context;
};

interface OrderConfirmationProps extends PropsWithChildren {
  selectedCartItems: CartItem[];
  isInIsland: boolean;
  setIsInIsland: (inIsland: boolean) => void;
  couponsData: Coupon[] | null;
  couponSelection: UseCouponSelectionReturn;
  result: CouponDiscountResult;
}

function OrderConfirmation({
  selectedCartItems,
  children,
  isInIsland,
  setIsInIsland,
  couponsData,
  couponSelection,
  result,
}: OrderConfirmationProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const invalidCoupons = useMemo(
    () =>
      couponsData?.filter((c) => !validateCoupon(c, selectedCartItems).isValid),
    [couponsData, selectedCartItems]
  );

  const contextValue: OrderConfirmationContextValue = {
    selectedCartItems,
    isModalOpen,
    setIsModalOpen,
    isInIsland,
    setIsInIsland,
    couponsData,
    couponSelection,
    result,
    invalidCoupons,
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

function BOGOOfferNotice() {
  const { couponsData } = useOrderConfirmationContext();
  const buyXgetYCoupon = couponsData?.find(
    (coupon) => coupon.discountType === "buyXgetY"
  );
  if (!buyXgetYCoupon) return null;
  return (
    <Styled.BOGOOfferNoticeWrapper>
      <Styled.BOGOOfferText>
        지금 모든 품목들 {buyXgetYCoupon.buyQuantity}개 구매 시{"\n"}
        {buyXgetYCoupon.getQuantity}개 <strong>무료!</strong>
      </Styled.BOGOOfferText>

      <Styled.BOGOOfferInstruction>
        <span>
          프로모션 적용을 위해서는 반드시&nbsp;
          <em>
            {(buyXgetYCoupon.buyQuantity ?? 0) +
              (buyXgetYCoupon.getQuantity ?? 0)}
            개
          </em>
          를 장바구니에 담아주세요.
        </span>
      </Styled.BOGOOfferInstruction>
    </Styled.BOGOOfferNoticeWrapper>
  );
}

function ItemList() {
  const { selectedCartItems, couponsData } = useOrderConfirmationContext();

  return (
    <OrderConfirmationList>
      {selectedCartItems.map((cartItem) => (
        <OrderConfirmationPreviewCard
          key={cartItem.id}
          cartItem={cartItem}
          couponsData={couponsData}
        />
      ))}
    </OrderConfirmationList>
  );
}

function CouponSelection({ children }: PropsWithChildren) {
  const {
    isModalOpen,
    setIsModalOpen,
    couponsData,
    couponSelection,
    result,
    invalidCoupons,
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
                        (invalid) => invalid.id === coupon.id
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
  const { isInIsland, setIsInIsland, result } = useOrderConfirmationContext();
  const shippingFee = result.shippingFee;

  const notice = getShippingNotice({ isInIsland, shippingFee });

  return (
    <Styled.ShippingIsland>
      <Styled.ShippingIslandTitle>배송 정보</Styled.ShippingIslandTitle>

      <Styled.ShippingIslandWrapper>
        <CheckBox
          id="isInIsland"
          checked={isInIsland}
          onChange={() => setIsInIsland(!isInIsland)}
          label="제주도 및 도서 산간 지역"
          hidden
        />
        <Styled.ShippingIslandDescription>
          제주도 및 도서 산간 지역
        </Styled.ShippingIslandDescription>
      </Styled.ShippingIslandWrapper>

      {notice && (
        <CartListStyled.Notice>
          <CartListStyled.NoticeIcon src={noticeIcon} />
          <CartListStyled.NoticeContent>{notice}</CartListStyled.NoticeContent>
        </CartListStyled.Notice>
      )}
    </Styled.ShippingIsland>
  );
}

// 이징도 helper가 나오면
// 훅으로 분리할수도 있지만 일단 컴포넌트에다 두겠습니다!
function getShippingNotice({
  isInIsland,
  shippingFee,
}: {
  isInIsland: boolean;
  shippingFee: number;
}) {
  // 1) 도서‧산간 + 무료 배송(쿠폰 적용 등)
  if (isInIsland && shippingFee === 0) {
    return (
      <CartListStyled.FreeShippingCouponAppliedNotice>
        무료배송 쿠폰이 적용되어{"\n"}
        제주도 및 도서 산간 지역 추가 배송비도 무료입니다!
      </CartListStyled.FreeShippingCouponAppliedNotice>
    );
  }

  // 2) 도서‧산간 + 추가 배송비 발생
  if (isInIsland && shippingFee > 0) {
    return (
      <CartListStyled.FreeShippingNotice>
        제주도 및 도서 산간 지역은{" "}
        {ISLAND_ADDITIONAL_SHIPPING_FEE.toLocaleString()}원 배송비가 추가됩니다.
      </CartListStyled.FreeShippingNotice>
    );
  }

  // 3) 일반 지역 + 아직 무료 배송 조건 미충족
  if (!isInIsland && shippingFee > 0) {
    return (
      <CartListStyled.FreeShippingNotice>
        총 주문 금액이 {FREE_SHIPPING_OVER.toLocaleString()}원 이상일 경우 무료
        배송됩니다.
      </CartListStyled.FreeShippingNotice>
    );
  } else {
    return (
      <CartListStyled.FreeShippingNotice>
        총 주문 금액이 {FREE_SHIPPING_OVER.toLocaleString()}원 이상일 경우 무료
        배송됩니다.
      </CartListStyled.FreeShippingNotice>
    );
  }
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
OrderConfirmation.BOGOOfferNotice = BOGOOfferNotice;

export default OrderConfirmation;
