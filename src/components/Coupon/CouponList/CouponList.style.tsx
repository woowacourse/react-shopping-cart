import { zIndex } from "@/styles/theme";
import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  z-index: ${zIndex.modal};
`;

export const UlContainer = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  border-top: 1px solid #0000001a;
  gap: 16px;
`;
export const CouponListHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 24px;
  line-height: 1;
  margin-bottom: 12px;
`;
export const Notice = styled.div`
  display: flex;
  width: 100%;
  gap: 4px;
  align-items: center;
`;
export const NoticeIcon = styled.img`
  width: 16px;
  height: 16px;
`;
export const CouponNoticeText = styled.p`
  color: #333333;
  font-size: 12px;
  font-weight: 600;
`;
