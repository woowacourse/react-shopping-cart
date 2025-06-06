import { Container } from "./CouponList.styles";

interface CouponListProps {
  children: React.ReactNode;
}

function CouponList({ children }: CouponListProps) {
  return <section css={Container}>{children}</section>;
}

export default CouponList;
