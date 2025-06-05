import { CartItem } from "@/type/CartItem";

import * as Styled from "./OrderConfirmationPreviewCard.style";

import CustomImage from "@/components/common/CustomImage";
import { Coupon } from "@/type/Coupon";

interface OrderConfirmationPreviewCardProps {
  cartItem: CartItem;
  couponsData: Coupon[] | null;
}

function OrderConfirmationPreviewCard({
  cartItem,
  couponsData,
}: OrderConfirmationPreviewCardProps) {
  const { product, quantity, id } = cartItem;
  const { name, price, imageUrl } = product;
  const buyXgetYCoupon = couponsData?.find(
    (coupon) => coupon.discountType === "buyXgetY"
  );

  return (
    <li key={id}>
      <Styled.Container>
        <Styled.Wrapper>
          <CustomImage
            imageUrl={imageUrl}
            alt={name}
            height={100}
            width={100}
          />
          <Styled.ProductInfo>
            <Styled.ProductName>{name}</Styled.ProductName>
            <Styled.Price>{price.toLocaleString()}원</Styled.Price>
            {/* 이상하게 해당 부분에서 계속 충돌이 일어나는데, 이 부분만 이렇게 바꾸었습니다. */}
            <span style={{ fontSize: "0.75rem", fontWeight: "500" }}>
              {quantity}개
            </span>
            {couponsData &&
              buyXgetYCoupon?.buyQuantity &&
              quantity + 1 === buyXgetYCoupon.buyQuantity && (
                <Styled.CouponInfo>
                  한개만 더 구매하면 {buyXgetYCoupon.getQuantity}개{" "}
                  <span>무료!</span>
                </Styled.CouponInfo>
              )}
          </Styled.ProductInfo>
        </Styled.Wrapper>
      </Styled.Container>
    </li>
  );
}

export default OrderConfirmationPreviewCard;
