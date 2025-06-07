import { CouponModalListStyle } from './CouponModal.styles';

function CouponList({ children }: { children: React.ReactNode }) {
  return <ul css={CouponModalListStyle}>{children}</ul>;
}

export default CouponList;
