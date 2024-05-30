import { Skeleton } from "@/styles/common";
import styled from "styled-components";

export const SkCartHeaderTitle = styled.span`
  ${({ theme }) => theme.TEXT.Title};
  ${Skeleton}
`;

export const SkCheckBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 1px;
  ${Skeleton}
`;

export const CheckBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 1px;
`;

export const CartItemListWrapper = styled.div`
  padding: 36px 24px 0px 24px;
  width: 100%;
  padding-bottom: 64px;
  overflow-y: scroll;
`;
