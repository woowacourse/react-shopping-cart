import {FlexCenter} from "@/styles/common.ts";
import styled from "styled-components";

export const OrderConfirmButton = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 430px;
  margin: 0;
`;

export const Wrapper = styled.div`
  ${FlexCenter}
  height: calc(100% - 128px);
`;

export const ButtonText = styled.span`
  font-size: 16px;
  line-height: 16px;
  font-weight: 700;
`;
