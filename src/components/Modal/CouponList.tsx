import { getCoupon } from '../../apis/coupon';
import { useAPI } from '../../context/APIContext';
import { CouponsResponse } from '../../types/coupons';
import Text from '../Text/Text';
import CouponListItem from './CouponListItem';

interface Props {
  selectedCoupons: CouponsResponse[];
  setSelectedCoupons: (selected: CouponsResponse[]) => void;
}
export default function CouponList({ selectedCoupons, setSelectedCoupons }: Props) {
  const {
    data: coupons,
    isLoading,
    isError,
  } = useAPI<CouponsResponse[]>({
    name: 'coupons',
    fetcher: getCoupon,
  });

  const selectedIds = selectedCoupons.map((c) => c.id);

  const toggleCoupon = (coupon: CouponsResponse) => {
    const isSelected = selectedIds.includes(coupon.id);

    let updated: CouponsResponse[];
    if (isSelected) {
      updated = selectedCoupons.filter((c) => c.id !== coupon.id);
    } else if (selectedCoupons.length < 2) {
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
      {coupons?.map((coupon) => (
        <CouponListItem
          key={coupon.id}
          coupon={coupon}
          isChecked={selectedIds.includes(coupon.id)}
          onToggle={() => toggleCoupon(coupon)}
        />
      ))}
    </>
  );
}
