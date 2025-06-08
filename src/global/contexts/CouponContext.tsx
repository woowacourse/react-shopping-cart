import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { CartItemType } from '../../components/features/cart/types';
import {
  Coupon,
  CouponDiscount,
} from '../../components/features/orderConfirm/types';
import fetchData from '../../components/features/cart/utils/fetchData';
import { calculateCouponDiscount } from '../../components/features/orderConfirm/utils/calculateCouponDiscount';

interface CouponProviderProps {
  products: CartItemType[];
  children: React.ReactNode;
}

interface CouponContextValue {
  coupons: Coupon[];
  selected: number[];
  setSelected: React.Dispatch<React.SetStateAction<number[]>>;
  couponDiscounts: { coupon: Coupon; discount: number }[];
  totalDiscount: number;
  fetchCoupons: () => Promise<void>;
}

const CouponContext = createContext<CouponContextValue | null>(null);

export function CouponProvider({ products, children }: CouponProviderProps) {
  const [coupons, setCoupons] = useState<Coupon[]>([]);

  const fetchCoupons = async () => {
    const data = await fetchData<Coupon[]>()('/coupons');
    setCoupons(data ?? []);
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const couponDiscounts: CouponDiscount[] = coupons.map((coupon) => ({
    coupon,
    discount: calculateCouponDiscount(coupon, products),
  }));

  const bestTwoIds = couponDiscounts
    .sort((a, b) => b.discount - a.discount)
    .slice(0, 2)
    .map((d) => d.coupon.id);

  const [selected, setSelected] = useState<number[]>(bestTwoIds);

  useEffect(() => {
    setSelected(bestTwoIds);
  }, [
    JSON.stringify(coupons.map((c) => c.id)),
    JSON.stringify(products.map((i) => [i.id, i.quantity])),
  ]);

  const totalDiscount = couponDiscounts
    .filter((d) => selected.includes(d.coupon.id))
    .reduce((sum, d) => sum + d.discount, 0);

  const value = useMemo(
    () => ({
      coupons,
      selected,
      setSelected,
      couponDiscounts,
      totalDiscount,
      fetchCoupons,
    }),
    [coupons, selected, setSelected, couponDiscounts, totalDiscount]
  );

  return (
    <CouponContext.Provider value={value}>{children}</CouponContext.Provider>
  );
}

export function useCouponContext() {
  const ctx = useContext(CouponContext);
  if (!ctx) throw new Error('CouponContext not found!');
  return ctx;
}
