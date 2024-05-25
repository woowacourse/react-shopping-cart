import { atom, selector } from 'recoil';
import { shippingFeeSelector } from './cartItems';

export const applyCouponState = atom({
  key: 'applyCouponState',
  default: 0,
});

export const shippingFeeDiscountState = atom({
  key: 'shippingFeeDiscountState',
  default: false,
});

export const totaltotalSelector = selector({
  key: 'sss',
  get: ({ get }) => {
    const total = get(applyCouponState);
    const shipping = get(shippingFeeDiscountState);
    const realShip = get(shippingFeeSelector);
    //만약 배송할인이 true 라면 , 그리고 배송비가 6000원이면 6000 빼주고, 3000원이면 3000원 빼주기
    return shipping ? total + realShip : total;
  },
});

// applyCouponState selector 로 shippingFeeDiscountState 뺴주기

// export const
