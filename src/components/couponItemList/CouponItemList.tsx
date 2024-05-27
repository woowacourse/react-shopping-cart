import { useRecoilState, useRecoilValue } from 'recoil';
import { getCouponList } from '../../api';
import {
  cartErrorMessageState,
  couponItemsState,
  previewSelectedCouponsState,
  selectedItemsState,
} from '../../recoil/atoms/atoms';
import { CouponItem } from '../couponItem/CouponItem';
import { useEffect } from 'react';
import { ErrorAlertModal } from '../errorAlertModal/ErrorAlertModal';
import { CouponProps } from '../../types';
import { isCouponExpired } from '../../validators/isCouponExpired/isCouponExpired';
import { isCouponAvailableTime } from '../../validators/isCouponAvailableTime/isCouponAvailableTime';
import { isOrderMinimumAmount } from '../../validators/isOrderMinimumAmount/isOrderMinimumAmount';
import { orderPriceState } from '../../recoil/selector/selector';
import { isCouponAvailableQuantity } from '../../validators/isCouponAvailableQuantity/isCouponAvailableQuantity';

export const CouponItemList: React.FC = () => {
  const selectedItems = useRecoilValue(selectedItemsState);
  const [couponItems, setCouponItems] = useRecoilState(couponItemsState);
  const [previewSelectedCoupons, setPreviewSelectedCoupons] = useRecoilState(
    previewSelectedCouponsState,
  );
  const [cartErrorMessage, setCartErrorMessage] = useRecoilState(
    cartErrorMessageState,
  );
  const orderPrice = useRecoilValue(orderPriceState);

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
      {couponItems.map((item) => {
        const isValidCoupon =
          isCouponExpired(item) &&
          isCouponAvailableTime(item) &&
          isOrderMinimumAmount(item, orderPrice) &&
          isCouponAvailableQuantity(item, selectedItems);
        return (
          <CouponItem
            key={item.code}
            item={item}
            onSelect={() => handleSelectCoupon(item)}
            selected={isSelected(item)}
            isValid={isValidCoupon}
          />
        );
      })}
      {cartErrorMessage.length > 0 && (
        <ErrorAlertModal errorMessage={cartErrorMessage} />
      )}
    </>
  );
};
