import { Button } from '@/shared/components/Button/Button';
import { CheckBox } from '@/shared/components/CheckBox/CheckBox';
import { Flex } from '@/shared/components/Flex/Flex';
import { Text } from '@/shared/components/Text/Text';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { PropsWithChildren } from 'react';

type Coupon = {
  id: number;
  title: string;
  description: string;
  expirationDate: string;
  minimumAmount?: number;
  availableTime?: string;
  checked: boolean;
};

type CouponModalProps = {
  coupons: Coupon[];
  onClose: () => void;
  onToggleCoupon: (id: number) => void;
  onApply: () => void;
  totalDiscount: number;
};

export const CouponModal = ({
  coupons,
  onClose,
  onToggleCoupon,
  onApply,
  totalDiscount,
}: CouponModalProps) => {
  return (
    <Overlay>
      <Modal>
        <Flex direction="row" justifyContent="space-between" alignItems="center" gap="0">
          <Text type="Body" weight="bold">
            쿠폰을 선택해 주세요
          </Text>
          <Button
            color="white"
            fontColor="black"
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
          {coupons.map((coupon) => (
            <CouponItem
              key={coupon.id}
              checked={coupon.checked}
              onClick={() => onToggleCoupon(coupon.id)}
            >
              {/* <CouponCheck checked={coupon.checked} /> */}
              <CheckBox />
              <CouponContent>
                <CouponTitle>{coupon.title}</CouponTitle>
                <CouponDesc>{coupon.description}</CouponDesc>
                <CouponDetail>만료일: {coupon.expirationDate}</CouponDetail>
                {coupon.minimumAmount && (
                  <CouponDetail>
                    최소 주문 금액: {coupon.minimumAmount.toLocaleString()}원
                  </CouponDetail>
                )}
                {coupon.availableTime && (
                  <CouponDetail>사용 가능 시간: {coupon.availableTime}</CouponDetail>
                )}
              </CouponContent>
            </CouponItem>
          ))}
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

const CouponItem = styled.li<{ checked: boolean }>`
  height: 100px;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 0;
  margin-bottom: 12px;
  border-top: 1px solid #e5e5e5;
  cursor: pointer;
`;

const CouponContent = styled.div`
  flex: 1;
`;

const CouponTitle = styled.div`
  font-weight: bold;
  font-size: 15px;
`;

const CouponDesc = styled.div`
  font-size: 13px;
  margin: 4px 0;
`;

const CouponDetail = styled.div`
  font-size: 12px;
  color: #666;
`;
