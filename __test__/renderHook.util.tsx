import {
  activeCouponCodesState,
  couponSelectedState,
  couponsState,
  discountAmountState,
} from '@store/couponStore';
import { additionalShippingFeeStatusState, orderAmountState } from '@store/orderStore';
import { isCheckedState, productsState } from '@store/productStore';
import { renderHook } from '@testing-library/react';
import { useRecoilValue, RecoilRoot } from 'recoil';
import { CartItemType } from 'types';
import { mockChecked, mockCoupons } from './mock';
import useCouponList from '@hooks/coupon/useCouponList';
import useCouponSelected from '@hooks/coupon/useCouponSelected';

interface renderHook_discountAmountProps {
  products: CartItemType[];
  hasAdditionalShippingFee: boolean;
  activeCoupons: string[];
}

export const renderHook_discountAmountState = ({
  products,
  hasAdditionalShippingFee,
  activeCoupons,
}: renderHook_discountAmountProps) => {
  return renderHook(() => useRecoilValue(discountAmountState), {
    wrapper: ({ children }) => (
      <RecoilRoot
        initializeState={({ set }) => {
          set(productsState, products);
          set(additionalShippingFeeStatusState, hasAdditionalShippingFee);
          set(isCheckedState, mockChecked);
          set(couponsState, mockCoupons);
          set(activeCouponCodesState, activeCoupons);
        }}
      >
        {children}
      </RecoilRoot>
    ),
  });
};

export const renderHook_disCountAmount_orderAmount = ({
  products,
  hasAdditionalShippingFee,
  activeCoupons,
}: renderHook_discountAmountProps) => {
  return renderHook(
    () => {
      const discountAmount = useRecoilValue(discountAmountState);
      const orderAmount = useRecoilValue(orderAmountState);

      return { discountAmount, orderAmount };
    },
    {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => {
            set(productsState, products);
            set(additionalShippingFeeStatusState, hasAdditionalShippingFee);
            set(isCheckedState, mockChecked);
            set(couponsState, mockCoupons);
            set(activeCouponCodesState, activeCoupons);
          }}
        >
          {children}
        </RecoilRoot>
      ),
    },
  );
};

interface renderHook_useCouponListProps {
  products: CartItemType[];
}

export const renderHook_useCouponList = ({ products }: renderHook_useCouponListProps) => {
  return renderHook(() => useCouponList(), {
    wrapper: ({ children }) => (
      <RecoilRoot
        initializeState={({ set }) => {
          set(productsState, products);
          set(isCheckedState, mockChecked);
          set(couponsState, mockCoupons);
          set(activeCouponCodesState, []);
        }}
      >
        {children}
      </RecoilRoot>
    ),
  });
};

interface renderHook_useCouponSelected_activeCouponProps {
  couponSelected: Record<string, boolean>;
  activeCoupons: string[];
}

export const renderHook_useCouponSelected_activeCoupon = ({
  couponSelected,
  activeCoupons,
}: renderHook_useCouponSelected_activeCouponProps) => {
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
            set(couponSelectedState, couponSelected);
            set(activeCouponCodesState, activeCoupons);
          }}
        >
          {children}
        </RecoilRoot>
      ),
    },
  );
};

interface renderHook_orderAmountStateProps {
  products: CartItemType[];
  isChecked: Record<string, boolean>;
}

export const renderHook_orderAmountState = ({
  products,
  isChecked,
}: renderHook_orderAmountStateProps) => {
  return renderHook(() => useRecoilValue(orderAmountState), {
    wrapper: ({ children }) => (
      <RecoilRoot
        initializeState={({ set }) => {
          set(productsState, products);
          set(isCheckedState, isChecked);
        }}
      >
        {children}
      </RecoilRoot>
    ),
  });
};
