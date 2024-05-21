import {Skeleton} from "@/styles/common.ts";
import styled from "styled-components";

export const Wrapper = styled.div`
  min-height: 170px;
  margin-top: 15px;
  gap: 8px;
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;

export const BorderLine = styled.div`
  width: 100%;
  border-top: 1px solid ${({theme}) => theme.COLOR.grey};
`;

export const SkPriceInfoBox = styled.div`
  width: 100%;
  height: 42px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  ${Skeleton}
`;
