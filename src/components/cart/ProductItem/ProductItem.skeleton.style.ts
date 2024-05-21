import {Skeleton} from "@/styles/common.ts";
import styled from "styled-components";

export const ItemButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: 24px;
  margin-top: 12px;
  ${Skeleton}
`;

export const ItemInfoBox = styled.div`
  height: 112px;
  margin-top: 12px;
  display: flex;
  align-items: center;
  ${Skeleton}
`;

export const ItemInfoTextBox = styled.div`
  height: 93px;
  width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  margin-left: 30px;
  ${Skeleton}
`;

export const ItemImgBox = styled.div`
  width: 112px;
  height: 112px;
  border-radius: 10px;
  background-size: cover;
  background-repeat: no-repeat;
  ${Skeleton}
`;

export const UpdateButtonWrapper = styled.div`
  width: 70px;
  height: 30px;
  ${Skeleton}
`;

export const ProductQuantity = styled.span`
  height: 15px;
  font-size: 12px;
  line-height: 15px;
  font-weight: 500;
  ${Skeleton}
`;

export const ButtonSection = styled.div`
  height: 24px;
  width: 100%;
  ${Skeleton}
`;

export const TextSection = styled.span`
  height: 24px;
  width: 150px;
  ${Skeleton}
`;
