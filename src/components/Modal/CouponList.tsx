import { getCoupon } from '../../apis/coupon';
import { useAPI } from '../../context/APIContext';
import { CouponsResponse } from '../../types/coupons';
import { Content } from '../../types/cartItems';
import Text from '../Text/Text';
import CouponListItem from './CouponListItem';
import { useCouponHandlers } from '../../hooks/useCouponHandlers';

interface Props {
  selectedCoupons: CouponsResponse[];
  setSelectedCoupons: (selected: CouponsResponse[]) => void;
  orderPrice: number;
  selectedItems: Content[];
}

export default function CouponList({ selectedCoupons, setSelectedCoupons, orderPrice, selectedItems }: Props) {
  const {
    data: coupons,
    isLoading,
    isError,
  } = useAPI<CouponsResponse[]>({
    name: 'coupons',
    fetcher: getCoupon,
  });

  const { isCouponDisabled, toggleCoupon, selectedIds } = useCouponHandlers(
    selectedCoupons,
    setSelectedCoupons,
    orderPrice,
    selectedItems
  );

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
          isDisabled={isCouponDisabled(coupon)}
        />
      ))}
    </>
  );
}
