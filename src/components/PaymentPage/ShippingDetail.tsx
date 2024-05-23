import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";

import { isRemoteDeliveryAreaState } from "../../recoil/isRemoteDeliveryArea";
import { formatToKRW } from "../../utils/domain/formatToKRW";
import { SHIPPING_COST_FOR_REMOTE } from "../../constants/pricing";
import { cartAmountState } from "../../recoil/cartAmount";

export default function ShippingDetail() {
  const { shippingCost } = useRecoilValue(cartAmountState);
  const [isRemoteDeliveryArea, setIsRemoteDeliveryArea] = useRecoilState(isRemoteDeliveryAreaState);

  const toggleIsRemoteDeliveryArea = () => setIsRemoteDeliveryArea((prev) => !prev);

  const isFreeShipping = shippingCost === 0;
  if (isFreeShipping) return null;

  return (
    <S.Container>
      <S.Title>배송 정보</S.Title>
      <S.InnerWrapper>
        <S.Checkbox
          id="isRemoteDeliveryArea"
          type="checkbox"
          checked={isRemoteDeliveryArea}
          onChange={toggleIsRemoteDeliveryArea}
        />
        <S.Label htmlFor="isRemoteDeliveryArea">제주도 및 도서 산간 지역</S.Label>
      </S.InnerWrapper>
      {isRemoteDeliveryArea && (
        <S.Noti>
          *도서산간 지역은 배송비 {formatToKRW(SHIPPING_COST_FOR_REMOTE)}이 부과됩니다.
        </S.Noti>
      )}
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    height: 80px;
  `,

  InnerWrapper: styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 10px 0 8px 0;
  `,

  Title: styled.div`
    font-size: 16px;
    font-weight: 700;
    margin: 0;
  `,

  Checkbox: styled.input`
    accent-color: black;
    margin: 0;
    width: 20px;
    height: 20px;
    cursor: pointer;
  `,

  Label: styled.label`
    font-size: 12px;
    cursor: pointer;
  `,

  Noti: styled.div`
    font-size: 12px;
    line-height: 15px;
    font-weight: 500;
    color: rgba(51, 51, 51, 0.5);
  `,
};
