import { getCoupon } from '../../apis/coupon';
import { useAPI } from '../../context/APIContext';
import { CouponsResponse } from '../../types/coupons';
import { Content } from '../../types/cartItems';
import Text from '../Text/Text';
import CouponListItem from './CouponListItem';

interface Props {
  selectedCoupons: CouponsResponse[];
  setSelectedCoupons: (selected: CouponsResponse[]) => void;
  orderPrice: number;
  selectedItems: Content[];
}

const MAX_SELECTED_COUPONS = 2;
const STARTED_HOUR = 4;
const ENDED_HOUR = 7;
const MIN_ORDER_PRICE_FOR_COUPON = 100000;
const MIN_ORDER_PRICE_FOR_Shipping_FEE = 50000;

export default function CouponList({ selectedCoupons, setSelectedCoupons, orderPrice, selectedItems }: Props) {
  const {
    data: coupons,
    isLoading,
    isError,
  } = useAPI<CouponsResponse[]>({
    name: 'coupons',
    fetcher: getCoupon,
  });

  const selectedIds = selectedCoupons.map((c) => c.id);

  const isCouponDisabled = (coupon: CouponsResponse): boolean => {
    const currentHour = new Date().getHours();
    const isAlreadySelected = selectedIds.includes(coupon.id);

    if (!isAlreadySelected && selectedCoupons.length >= MAX_SELECTED_COUPONS) {
      return true;
    }

    switch (coupon.id) {
      case 1:
        return orderPrice < MIN_ORDER_PRICE_FOR_COUPON;
      case 2: {
        const sameProductCounts = new Map<number, number>();
        selectedItems.forEach((item) => {
          const id = item.product.id;
          sameProductCounts.set(id, (sameProductCounts.get(id) ?? 0) + item.quantity);
        });
        return !Array.from(sameProductCounts.values()).some((count) => count >= 2 && count % 2 === 0);
      }

      case 3:
        return orderPrice < MIN_ORDER_PRICE_FOR_Shipping_FEE;

      case 4:
        return !(STARTED_HOUR < currentHour && currentHour < ENDED_HOUR);

      default:
        return false;
    }
  };

  const toggleCoupon = (coupon: CouponsResponse) => {
    if (isCouponDisabled(coupon)) return;

    const isSelected = selectedIds.includes(coupon.id);

    let updated: CouponsResponse[];
    if (isSelected) {
      updated = selectedCoupons.filter((c) => c.id !== coupon.id);
    } else if (selectedCoupons.length < MAX_SELECTED_COUPONS) {
      updated = [...selectedCoupons, coupon];
    } else {
      updated = selectedCoupons;
    }

    setSelectedCoupons(updated);
  };

  if (isLoading) return <Text>불러오는 중...</Text>;
  if (isError) return <Text>쿠폰을 불러오지 못했습니다.</Text>;

  return (
    <>
      {coupons?.map((coupon) => {
        const disabled = isCouponDisabled(coupon);

        return (
          <CouponListItem
            key={coupon.id}
            coupon={coupon}
            isChecked={selectedIds.includes(coupon.id)}
            onToggle={() => toggleCoupon(coupon)}
            isDisabled={disabled}
          />
        );
      })}
    </>
  );
}
