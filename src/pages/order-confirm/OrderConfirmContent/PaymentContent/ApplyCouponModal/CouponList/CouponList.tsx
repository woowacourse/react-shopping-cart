import * as S from "./CouponList.styled";
import { ReactNode } from "react";

type CouponListProps = {
  children: ReactNode;
};

export default function CouponList({ children }: CouponListProps) {
  return <S.CouponList>{children}</S.CouponList>;
}
