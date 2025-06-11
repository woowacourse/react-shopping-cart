import { CartItem } from "@/type/CartItem";

import * as Styled from "./OrderConfirmationPreviewCard.style";

import CustomImage from "@/components/common/CustomImage";
import { Coupon } from "@/type/Coupon";
import useBogoBanner from "@/hooks/Promotion/useBogoBanner";

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

  const bannerMsg = useBogoBanner(quantity, couponsData);
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
            <span style={{ fontSize: "0.75rem", fontWeight: 500 }}>
              {quantity}개
            </span>
            {bannerMsg && <Styled.CouponInfo>{bannerMsg}</Styled.CouponInfo>}
          </Styled.ProductInfo>
        </Styled.Wrapper>
      </Styled.Container>
    </li>
  );
}
export default OrderConfirmationPreviewCard;
