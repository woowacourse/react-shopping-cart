import { FlexCenter } from "@/styles/common";
import styled from "styled-components";

export const FlexWrapper = styled.div`
  ${FlexCenter};
  flex-direction: column;
  height: calc(100vh - 128px);
  gap: 20px;
  width: 100%;
`;

export const OrderConfirmButton = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 430px;
  margin: 0;
`;

export const ButtonText = styled.span`
  font-size: 16px;
  line-height: 16px;
  font-weight: 700;
`;
