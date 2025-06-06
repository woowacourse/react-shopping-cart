import { Container } from "./CouponList.styles";

interface CouponListProps {
  children: React.ReactNode;
}

function CouponList({ children }: CouponListProps) {
  return <ul css={Container}>{children}</ul>;
}

export default CouponList;
