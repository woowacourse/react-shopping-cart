import { css } from '@emotion/react';
import Button from '../../components/Button/Button';
import Header from '../../components/Header/Header';
import * as S from './OrderConfirmPage.styles';
import { useNavigate, useLocation } from 'react-router';
import OrderConfirmSection from '../../components/OrderConfirmSection/OrderConfirmSection';
import { Content } from '../../types/cartItems';
import Text from '../../components/Text/Text';
import { useMemo, useState } from 'react';
import CouponModal from '../../components/Modal/Modal';
import { CouponsResponse } from '../../types/coupons';

export default function OrderConfirmPage() {
  const [isIslandChecked, setIsIslandChecked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedCoupons, setSelectedCoupons] = useState<CouponsResponse[]>([]);

  const navigate = useNavigate();
  const location = useLocation();
  const selectedItems: Content[] = useMemo(() => {
    return location.state?.selectedItems ?? [];
  }, [location.state?.selectedItems]);

  const selectedItemIds = selectedItems.map((item) => item.id);

  const { orderPrice, shippingFee, orderTotalPrice, totalQuantity } = useMemo(() => {
    let orderPrice = 0;
    let totalQuantity = 0;

    for (const item of selectedItems) {
      orderPrice += item.product.price * item.quantity;
      totalQuantity += item.quantity;
    }

    let shippingFee = orderPrice >= 100000 ? 0 : 3000;
    if (isIslandChecked) {
      shippingFee += 3000;
    }

    const orderTotalPrice = orderPrice + shippingFee;

    return { orderPrice, shippingFee, orderTotalPrice, totalQuantity };
  }, [selectedItems, isIslandChecked]);

  const { totalDiscount, totalPrice } = useMemo(() => {
    let discount = 0;
    let discountedPrice = orderPrice;

    const percentCoupon = selectedCoupons.find((coupon) => coupon.description === '미라클 모닝 30% 시간제 할인 쿠폰');

    if (percentCoupon) {
      const percentDiscount = Math.floor(orderPrice * 0.3);
      discount += percentDiscount;
      discountedPrice -= percentDiscount;
    }

    const otherCoupons = selectedCoupons.filter((coupon) => coupon.description !== '미라클 모닝 30% 시간제 할인 쿠폰');

    const getCouponEffect = (coupon: CouponsResponse): number => {
      switch (coupon.description) {
        case '5,000원 할인 쿠폰':
          return 5000;
        case '2개 구매 시 1개 무료 쿠폰': {
          const map = new Map<number, { quantity: number; price: number }>();
          selectedItems.forEach((item) => {
            const id = item.product.id;
            const existing = map.get(id);
            if (existing) {
              existing.quantity += item.quantity;
            } else {
              map.set(id, { quantity: item.quantity, price: item.product.price });
            }
          });
          let max = 0;
          map.forEach(({ quantity, price }) => {
            if (quantity >= 2 && price > max) {
              max = price;
            }
          });
          return max;
        }
        case '5만원 이상 구매 시 무료 배송 쿠폰':
          return shippingFee;
        default:
          return 0;
      }
    };

    const sortedCoupons = [...otherCoupons].sort((a, b) => getCouponEffect(b) - getCouponEffect(a));

    for (const coupon of sortedCoupons) {
      switch (coupon.description) {
        case '5,000원 할인 쿠폰':
          discount += 5000;
          discountedPrice -= 5000;
          break;

        case '2개 구매 시 1개 무료 쿠폰': {
          const map = new Map<number, { quantity: number; price: number }>();
          selectedItems.forEach((item) => {
            const id = item.product.id;
            const existing = map.get(id);
            if (existing) {
              existing.quantity += item.quantity;
            } else {
              map.set(id, { quantity: item.quantity, price: item.product.price });
            }
          });
          let max = 0;
          map.forEach(({ quantity, price }) => {
            if (quantity >= 2 && price > max) {
              max = price;
            }
          });
          discount += max;
          discountedPrice -= max;
          break;
        }

        case '5만원 이상 구매 시 무료 배송 쿠폰':
          discount += shippingFee;
          break;

        default:
          break;
      }
    }

    const totalPrice =
      discountedPrice +
      shippingFee -
      (selectedCoupons.some((c) => c.description === '5만원 이상 구매 시 무료 배송 쿠폰') ? shippingFee : 0);

    return { totalDiscount: discount, totalPrice };
  }, [selectedCoupons, selectedItems, orderPrice, shippingFee]);

  const fakeCartItemsResponse = {
    content: selectedItems,
    pageable: {
      pageNumber: 0,
      pageSize: 0,
      sort: { empty: true, sorted: false, unsorted: true },
      offset: 0,
      paged: false,
      unpaged: true,
    },
    last: true,
    totalElements: selectedItems.length,
    totalPages: 1,
    size: selectedItems.length,
    number: 0,
    sort: { empty: true, sorted: false, unsorted: true },
    first: true,
    numberOfElements: selectedItems.length,
    empty: selectedItems.length === 0,
  };

  const handleNavigateClick = () => {
    navigate('/completed', {
      state: {
        kind: selectedItems.length,
        quantity: selectedItems.reduce((sum, item) => sum + item.quantity, 0),
        orderTotalPrice: selectedItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
      },
    });
  };

  const onTitleClick = () => {
    navigate('/');
  };

  if (!selectedItems.length) return <Text variant="title-1">선택된 상품이 없습니다</Text>;

  return (
    <>
      <Header title="🔙" handleTitleClick={onTitleClick} />
      <OrderConfirmSection
        items={fakeCartItemsResponse}
        refetch={() => {}}
        selectedItemIds={selectedItemIds}
        setSelectedItemIds={() => {}}
        setIsModalOpen={setIsModalOpen}
        isIslandChecked={isIslandChecked}
        setIsIslandChecked={setIsIslandChecked}
        orderPrice={orderPrice}
        shippingFee={shippingFee}
        orderTotalPrice={orderTotalPrice}
        totalDiscount={totalDiscount}
        totalQuantity={totalQuantity}
        totalPrice={totalPrice}
      />
      <S.ButtonWrapper>
        <Button
          css={css`
            height: 48px;
          `}
          onClick={handleNavigateClick}
        >
          결제하기
        </Button>
      </S.ButtonWrapper>
      {isModalOpen && (
        <CouponModal
          onClose={() => setIsModalOpen(false)}
          selectedCoupons={selectedCoupons}
          setSelectedCoupons={setSelectedCoupons}
          totalDiscount={totalDiscount}
          orderPrice={orderPrice}
          selectedItems={selectedItems}
        />
      )}
    </>
  );
}
