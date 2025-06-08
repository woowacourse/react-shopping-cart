import { getCoupon } from '../../apis/coupon';
import { useAPI } from '../../context/APIContext';
import { CouponsResponse } from '../../types/coupons';
import Text from '../Text/Text';

import CouponListItem from './CouponListItem';
import { useState } from 'react';

interface Props {
  onSelectChange: (selected: CouponsResponse[]) => void;
}

export default function CouponList({ onSelectChange }: Props) {
  const {
    data: coupons,
    isLoading,
    isError,
  } = useAPI<CouponsResponse[]>({
    name: 'coupons',
    fetcher: getCoupon,
  });

  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const toggleCoupon = (coupon: CouponsResponse) => {
    const isSelected = selectedIds.includes(coupon.id);
    let updatedIds: number[];

    if (isSelected) {
      updatedIds = selectedIds.filter((id) => id !== coupon.id);
    } else {
      updatedIds = selectedIds.length < 2 ? [...selectedIds, coupon.id] : selectedIds;
    }

    setSelectedIds(updatedIds);
    const selectedCoupons = coupons?.filter((c) => updatedIds.includes(c.id)) ?? [];
    onSelectChange(selectedCoupons);
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
