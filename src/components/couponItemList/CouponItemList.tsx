import { useRecoilState, useRecoilValue } from 'recoil';
import { getCouponList } from '../../api';
import {
  isValidCouponSelectionState,
  orderPriceState,
} from '../../recoil/selector/selector';
import { CouponProps } from '../../types';
import { isCouponAvailableQuantity } from '../../validators/isCouponAvailableQuantity/isCouponAvailableQuantity';
import { isCouponAvailableTime } from '../../validators/isCouponAvailableTime/isCouponAvailableTime';
import { isCouponExpired } from '../../validators/isCouponExpired/isCouponExpired';
import { isOrderMinimumAmount } from '../../validators/isOrderMinimumAmount/isOrderMinimumAmount';
import { CouponItem } from '../couponItem/CouponItem';
import { ErrorAlertModal } from '../errorAlertModal/ErrorAlertModal';
import {
  cartErrorMessageState,
  couponItemsState,
  previewSelectedCouponsState,
  selectedItemsState,
} from '../../recoil/atoms/atoms';
import { useEffect } from 'react';

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
  const isValidCouponSelection = useRecoilValue(isValidCouponSelectionState);

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
          (previewSelectedCoupon) => previewSelectedCoupon.id !== item.id,
        ),
      );
    } else {
      setPreviewSelectedCoupons((prev) => [...prev, item]);
    }
  };

  const isValidCoupon = (coupon: CouponProps) => {
    switch (coupon.discountType) {
      case 'fixed':
        return (
          isCouponExpired(coupon) && isOrderMinimumAmount(coupon, orderPrice)
        );
      case 'percentage':
        return (
          isCouponExpired(coupon) && isCouponAvailableTime(coupon, new Date())
        );
      case 'buyXgetY':
        return (
          isCouponExpired(coupon) &&
          isCouponAvailableQuantity(coupon, selectedItems)
        );
      case 'freeShipping':
        return (
          isCouponExpired(coupon) && isOrderMinimumAmount(coupon, orderPrice)
        );
      default:
        return false;
    }
  };

  const isValidItem = (item: CouponProps) => {
    if (!isValidCouponSelection) {
      return isSelected(item) ? isValidCoupon(item) : false;
    } else {
      return isValidCoupon(item);
    }
  };

  return (
    <>
      {couponItems.map((item) => (
        <CouponItem
          key={item.id}
          item={item}
          onSelect={() => handleSelectCoupon(item)}
          selected={isSelected(item)}
          isValid={isValidItem(item)}
        />
      ))}
      {cartErrorMessage.length > 0 && (
        <ErrorAlertModal errorMessage={cartErrorMessage} />
      )}
    </>
  );
};
