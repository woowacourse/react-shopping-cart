import { useRecoilState } from 'recoil';
import { getCouponList } from '../../api';
import {
  cartErrorMessageState,
  couponItemsState,
  previewSelectedCouponsState,
} from '../../recoil/atoms/atoms';
import { CouponItem } from '../couponItem/CouponItem';
import { useEffect } from 'react';
import { ErrorAlertModal } from '../errorAlertModal/ErrorAlertModal';
import { CouponProps } from '../../types';

export const CouponItemList: React.FC = () => {
  const [couponItems, setCouponItems] = useRecoilState(couponItemsState);
  const [previewSelectedCoupons, setPreviewSelectedCoupons] = useRecoilState(
    previewSelectedCouponsState,
  );
  const [cartErrorMessage, setCartErrorMessage] = useRecoilState(
    cartErrorMessageState,
  );

  useEffect(() => {
    const fetchCouponItems = async () => {
      try {
        const couponItems = await getCouponList();
        setCouponItems(couponItems);
      } catch (error) {
        console.error('Failed to fetch coupon list:', error);
        setCartErrorMessage('쿠폰 리스트를 불러오는데 실패했습니다.');
      }
    };

    fetchCouponItems();
  }, [setCartErrorMessage, setCouponItems]);

  const isSelected = (item: CouponProps) => {
    return (
      previewSelectedCoupons.find(
        (selectedCoupon) => selectedCoupon.id === item.id,
      ) !== undefined
    );
  };

  const handleSelectCoupon = (item: CouponProps) => {
    if (isSelected(item)) {
      setPreviewSelectedCoupons((prev) =>
        prev.filter(
          (previewSelectedCoupons) => previewSelectedCoupons.id !== item.id,
        ),
      );
    } else {
      setPreviewSelectedCoupons((prev) => [...prev, item]);
    }
  };

  return (
    <>
      {couponItems.map((item) => (
        <CouponItem
          key={item.code}
          item={item}
          onSelect={() => handleSelectCoupon(item)}
          selected={isSelected(item)}
        />
      ))}
      {cartErrorMessage.length > 0 && (
        <ErrorAlertModal errorMessage={cartErrorMessage} />
      )}
    </>
  );
};
