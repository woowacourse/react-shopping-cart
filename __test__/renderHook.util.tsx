import {
  activeCouponCodesState,
  couponSelectedState,
  couponsState,
  discountAmountState,
} from '@store/couponStore';
import {
  additionalShippingFeeStatusState,
  orderAmountState,
  totalAmountState,
  totalProductQuantityState,
  totalShippingFeeState,
} from '@store/orderStore';
import { cartItemsCheckedState, fetchCartItemState } from '@store/productStore';
import { renderHook } from '@testing-library/react';
import { useRecoilValue, RecoilRoot } from 'recoil';
import { CartItemType } from 'types';
import { mockChecked, mockCoupons, mockProductAmount160_000 } from './mock';
import useCouponList from '@hooks/coupon/useCouponList';
import useCouponSelected from '@hooks/coupon/useCouponSelected';

interface renderHookProps {
  products?: CartItemType[];
  hasAdditionalShippingFee?: boolean;
  activeCoupons?: string[];
  couponSelected?: Record<string, boolean>;
  isChecked?: Record<string, boolean>;
}

export const renderHookAtOrder = ({
  products,
  hasAdditionalShippingFee,
  activeCoupons,
  isChecked,
}: renderHookProps) => {
  return renderHook(
    () => {
      const totalShippingFee = useRecoilValue(totalShippingFeeState);
      const discountAmount = useRecoilValue(discountAmountState);
      const orderAmount = useRecoilValue(orderAmountState);
      const totalAmount = useRecoilValue(totalAmountState);
      const totalProductQuantity = useRecoilValue(totalProductQuantityState);

      return { totalShippingFee, discountAmount, orderAmount, totalAmount, totalProductQuantity };
    },
    {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => {
            set(fetchCartItemState, products ?? mockProductAmount160_000);
            set(additionalShippingFeeStatusState, hasAdditionalShippingFee ?? false);
            set(cartItemsCheckedState, isChecked ?? mockChecked);
            set(couponsState, mockCoupons);
            set(activeCouponCodesState, activeCoupons ?? []);
          }}
        >
          {children}
        </RecoilRoot>
      ),
    },
  );
};

export const renderHookWithUseCouponList = ({ products }: renderHookProps) => {
  return renderHook(() => useCouponList(), {
    wrapper: ({ children }) => (
      <RecoilRoot
        initializeState={({ set }) => {
          set(fetchCartItemState, products as CartItemType[]);
          set(cartItemsCheckedState, mockChecked);
          set(couponsState, mockCoupons);
          set(activeCouponCodesState, []);
        }}
      >
        {children}
      </RecoilRoot>
    ),
  });
};

export const renderHookUseCouponSelected = ({ couponSelected, activeCoupons }: renderHookProps) => {
  return renderHook(
    () => {
      const { handleToggleCouponCheckbox, couponSelected } = useCouponSelected();
      const activeCouponCodes = useRecoilValue(activeCouponCodesState);

      return { handleToggleCouponCheckbox, couponSelected, activeCouponCodes };
    },
    {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => {
            set(couponSelectedState, couponSelected as Record<string, boolean>);
            set(activeCouponCodesState, activeCoupons as string[]);
          }}
        >
          {children}
        </RecoilRoot>
      ),
    },
  );
};
