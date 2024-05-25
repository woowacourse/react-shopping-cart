import { useRecoilValueLoadable } from 'recoil';
import { couponListState } from '../../recoil/couponList/couponListState';
import LoadingFallback from '../LoadingFallback/LoadingFallback';
import { ReactNode } from 'react';

const CouponListModalLoader = ({ children }: { children: ReactNode }) => {
  const couponListLoadable = useRecoilValueLoadable(couponListState);

  if (couponListLoadable.state === 'loading') return <LoadingFallback />;
  if (couponListLoadable.state === 'hasError') throw couponListLoadable.contents;
  if (couponListLoadable.state === 'hasValue') return children;
};

export default CouponListModalLoader;
