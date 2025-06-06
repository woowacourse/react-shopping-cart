import { Coupon } from '../../types/coupon';
import Text from '../common/Text/Text';

interface CouponItemProps {
  isChecked: boolean;
  onCheck: () => void;
  coupon: Coupon;
}

function CouponItem({ isChecked, onCheck, coupon }: CouponItemProps) {
  return (
    <div>
      <div>
        <input type="checkbox" checked={isChecked} onChange={onCheck} />
        <Text varient="body" textAlign="left">
          {coupon.code}
        </Text>
      </div>
      <div>
        <Text varient="body" textAlign="left">
          {coupon.expirationDate}
        </Text>
        {coupon.description && (
          <Text varient="body" textAlign="left">
            {coupon.description}
          </Text>
        )}
      </div>
    </div>
  );
}

export default CouponItem;
