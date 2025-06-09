import CartInfo from '../Cart/CartInfo';
import styled from '@emotion/styled';
import { COUPONS } from '../../constants/couponConfig';
import { HiddenCheckbox } from '../SelectBox/SelectBox.styles';
import { formatDate, formatTimeRange } from '../../utils/dateTimeFormatter';
import { Modal } from './index';
import { CouponCheckboxContainer, CouponStyledCheckbox } from '../../pages/OrderConfirmPage';
import { Coupon } from '../../types/coupon';

interface CouponModalProps {
  onClose: () => void;
  onToggleCoupon: (coupon: Coupon) => void;
  onApply: () => void;
  isCouponAvailable: (coupon: Coupon) => boolean;
  isCouponSelected: (couponId: number) => boolean;
  tempSelectedCoupons: Coupon[];
  tempCouponDiscount: number;
}

function CouponModal({
  onClose,
  onToggleCoupon,
  onApply,
  isCouponAvailable,
  isCouponSelected,
  tempSelectedCoupons,
  tempCouponDiscount,
}: CouponModalProps) {
  return (
    <Modal position="center" width="90%" title="쿠폰을 선택해 주세요" onClose={onClose}>
      <>
        <CartInfo
          description="쿠폰은 최대 2개까지 사용할 수 있습니다."
          style={{ marginTop: '32px' }}
        />
        <CouponListContainer>
          {COUPONS.map((coupon) => {
            const isAvailable = isCouponAvailable(coupon);
            const isSelected = isCouponSelected(coupon.id);
            const isSelectable = isAvailable && (tempSelectedCoupons.length < 2 || isSelected);

            return (
              <CouponContainer key={coupon.id}>
                <CouponCheckboxContainer>
                  <HiddenCheckbox
                    data-id={coupon.id}
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => isSelectable && onToggleCoupon(coupon)}
                    disabled={!isSelectable}
                  />
                  <CouponStyledCheckbox checked={isSelected} disabled={!isAvailable} />
                </CouponCheckboxContainer>
                <CouponContent>
                  <CouponTitle disabled={!isAvailable}>{coupon.description}</CouponTitle>
                  <CouponInfo>
                    <CouponDetail disabled={!isAvailable}>
                      만료일: {formatDate(coupon.expirationDate)}
                    </CouponDetail>
                    {coupon.availableTime && (
                      <CouponDetail disabled={!isAvailable}>
                        사용 가능 시간:{' '}
                        {formatTimeRange(coupon.availableTime.start, coupon.availableTime.end)}
                      </CouponDetail>
                    )}
                    {coupon.minimumAmount && (
                      <CouponDetail disabled={!isAvailable}>
                        최소 주문 금액: {coupon.minimumAmount.toLocaleString()}원
                      </CouponDetail>
                    )}
                  </CouponInfo>
                </CouponContent>
              </CouponContainer>
            );
          })}
        </CouponListContainer>
        <CouponButton onClick={onApply}>
          총 {tempCouponDiscount.toLocaleString()}원 할인 쿠폰 사용하기
        </CouponButton>
      </>
    </Modal>
  );
}

export default CouponModal;

const CouponButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  color: white;
  height: 48px;
  border-radius: 8px;
  border: none;
  background-color: #333333;
  font-weight: 700;
  font-size: 16px;
  line-height: 100%;
  text-align: center;
  cursor: pointer;
  margin-top: 24px;

  &:hover {
    background-color: #555;
  }
`;

const CouponListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  margin: 20px 0;
  max-height: 400px;
  overflow-y: auto;
`;

const CouponContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 12px;
  padding: 20px 0;
  border-bottom: 1px solid #0000001a;

  &:first-of-type {
    border-top: 1px solid #0000001a;
  }

  &:last-of-type {
    border-bottom: none;
  }
`;

const CouponContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`;

const CouponTitle = styled.h4<{ disabled?: boolean }>`
  font-weight: 700;
  font-size: 16px;
  line-height: 100%;
  vertical-align: middle;
  color: ${(props) => (props.disabled ? '#0000001A' : '#000')};
`;

const CouponInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const CouponDetail = styled.p<{ disabled?: boolean }>`
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  color: ${(props) => (props.disabled ? '#0000001A' : '#666')};
`;
