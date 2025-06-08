import { Button } from '@/shared/components/Button/Button';
import { CheckBox } from '@/shared/components/CheckBox/CheckBox';
import { Flex } from '@/shared/components/Flex/Flex';
import { Text } from '@/shared/components/Text/Text';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Coupon } from '../types/Coupon.types';
import { formatDate, formatTime } from '@/shared/utils/date';
import { useCartContext } from '@/features/Cart/context/CartProvider';
import { usePriceInfo } from '@/features/Cart/hooks/usePriceInfo';
import { CartItem } from '@/features/Cart/types/Cart.types';
import { useCartInfo } from '@/features/Cart/hooks/useCartInfo';

type CouponModalProps = {
  cartItems: CartItem[];
  coupons: Coupon[];
  onClose: () => void;
  onToggleCoupon: (id: number) => void;
  onApply: () => void;
};

export const CouponModal = ({
  cartItems,
  coupons,
  onClose,
  onToggleCoupon,
  onApply,
}: CouponModalProps) => {
  const { isRemoteArea } = useCartContext();
  const { selectedCartItems } = useCartInfo(cartItems);
  const { deliveryFee, totalPrice } = usePriceInfo(cartItems);
  const selectedCoupons = coupons.filter((c) => c.checked && !c.disabled);

  const totalDiscount = selectedCoupons.reduce((acc, c) => {
    switch (c.discountType) {
      case 'fixed':
        return acc + (c.discount ?? 0);
      case 'percentage':
        return acc + Math.floor(totalPrice * ((c.discount ?? 0) / 100));
      case 'buyXgetY':
        const bogoTargetItems = selectedCartItems.filter((item) => item.quantity >= 2);
        if (bogoTargetItems.length === 0) return acc;

        const mostExpensive = bogoTargetItems.reduce((prev, current) => {
          return current.product.price > prev.product.price ? current : prev;
        });

        return acc + mostExpensive.product.price;
      case 'freeShipping': {
        if (deliveryFee > 0) {
          return acc + (isRemoteArea ? 6000 : 3000);
        }
        return acc;
      }

      default:
        return acc;
    }
  }, 0);

  return (
    <Overlay>
      <Modal>
        <Flex direction="row" justifyContent="space-between" alignItems="center" gap="0">
          <Text
            type="Body"
            weight="bold"
            css={css`
              font-size: 18px;
            `}
          >
            쿠폰을 선택해 주세요
          </Text>
          <Button
            color="white"
            fontColor="black"
            onClick={onClose}
            css={css`
              padding: 0 0 8px 16px;
            `}
          >
            ✕
          </Button>
        </Flex>

        <Text
          type="Caption"
          weight="regular"
          css={css`
            margin: 20px 0 10px 0;
          `}
        >
          💡 쿠폰은 최대 2개까지 사용할 수 있습니다.
        </Text>

        <CouponList>
          {coupons.map((coupon) => {
            const checkboxId = `coupon-${coupon.id}`;
            return (
              <label key={coupon.id} htmlFor={checkboxId}>
                <CouponItem checked={coupon.checked} disabled={coupon.disabled}>
                  <CheckBox
                    id={checkboxId}
                    checked={coupon.checked}
                    onChange={() => onToggleCoupon(coupon.id)}
                    disabled={coupon.disabled}
                  />
                  <CouponContent>
                    <Text type="Body" weight="bold">
                      {coupon.description}
                    </Text>
                    {coupon.expirationDate && (
                      <StyledCouponDetailText>
                        만료일: {formatDate(coupon.expirationDate)}
                      </StyledCouponDetailText>
                    )}
                    {coupon.minimumAmount && (
                      <StyledCouponDetailText>
                        최소 주문 금액: {coupon.minimumAmount.toLocaleString()}원
                      </StyledCouponDetailText>
                    )}
                    {coupon.availableTime && (
                      <StyledCouponDetailText>
                        사용 가능 시간: {formatTime(coupon.availableTime.start)}부터{' '}
                        {formatTime(coupon.availableTime.end)}까지
                      </StyledCouponDetailText>
                    )}
                  </CouponContent>
                </CouponItem>
              </label>
            );
          })}
        </CouponList>

        <Button
          onClick={onApply}
          width="100%"
          size="sm"
          css={css`
            padding: 15px;
          `}
        >
          총 {totalDiscount.toLocaleString()}원 할인 쿠폰 사용하기
        </Button>
      </Modal>
    </Overlay>
  );
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
`;

const Modal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 90%;
  max-width: 400px;
  background: #fff;
  border-radius: 12px;
  padding: 30px;
  transform: translate(-50%, -50%);
`;

const CouponList = styled.ul`
  margin-top: 20px;
  max-height: 500px;
  overflow-y: auto;
  padding: 0;
`;

const CouponItem = styled.li<{ checked: boolean; disabled: boolean }>`
  height: 100px;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 0;
  margin-bottom: 12px;
  border-top: 1px solid #e5e5e5;

  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? 0.4 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
`;

const CouponContent = styled.div`
  flex: 1;
`;

const StyledCouponDetailText = ({ children }: { children: React.ReactNode }) => (
  <Text
    type="Caption"
    weight="regular"
    css={css`
      font-size: 12px;
      color: #666;
    `}
  >
    {children}
  </Text>
);
