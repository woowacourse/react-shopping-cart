import { useRecoilState } from 'recoil';
import { getCouponList } from '../../api';
import {
  cartErrorMessageState,
  couponItemsState,
  selectedCouponState,
} from '../../recoil/atoms/atoms';
import { CouponItem } from '../couponItem/CouponItem';
import { useEffect } from 'react';
import { ErrorAlertModal } from '../errorAlertModal/ErrorAlertModal';

export const CouponItemList: React.FC = () => {
  const [couponItems, setCouponItems] = useRecoilState(couponItemsState);
  const [selectedCoupon, setSelectedCoupon] =
    useRecoilState(selectedCouponState);
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

  return (
    <>
      {Object.values(couponItems).map((item) => (
        <CouponItem
          key={item.code}
          item={item}
          selected={!!selectedCoupon[item.code]}
        ></CouponItem>
      ))}
      {cartErrorMessage.length > 0 && (
        <ErrorAlertModal errorMessage={cartErrorMessage} />
      )}
    </>
  );
};
