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
  isIslandAreaSelected: boolean;
  setIsIslandAreaSelected: React.Dispatch<React.SetStateAction<boolean>>;
}

const CouponContext = createContext<CouponContextValue | null>(null);

export function CouponProvider({ products, children }: CouponProviderProps) {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [isIslandAreaSelected, setIsIslandAreaSelected] = useState(false);

  const fetchCoupons = async () => {
    const data = await fetchData<Coupon[]>()('/coupons');
    setCoupons(data ?? []);
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const couponDiscounts: CouponDiscount[] = coupons.map((coupon) => ({
    coupon,
    discount: calculateCouponDiscount(coupon, products, isIslandAreaSelected),
  }));

  const availableCoupons = couponDiscounts
    .filter((cd) => cd.discount > 0)
    .sort((a, b) => b.discount - a.discount);

  const bestIds = availableCoupons.slice(0, 2).map((cd) => cd.coupon.id);

  const [selected, setSelected] = useState<number[]>(bestIds);

  useEffect(() => {
    setSelected(bestIds);
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
      isIslandAreaSelected,
      setIsIslandAreaSelected,
    }),
    [
      coupons,
      selected,
      setSelected,
      couponDiscounts,
      totalDiscount,
      isIslandAreaSelected,
    ]
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
