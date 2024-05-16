import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { deliveryCostState, orderAmountState, totalOrderAmountState } from "../recoil/cartAmount";
import { ReactComponent as InfoIcon } from "../assets/info-icon.svg";

export interface ICartAmountProps {}

export default function CartAmount() {
  const orderAmount = useRecoilValue(orderAmountState);
  const deliveryCost = useRecoilValue(deliveryCostState);
  const totalOrderAmount = useRecoilValue(totalOrderAmountState);

  return (
    <S.CartAmountContainer>
      <S.CartAmountNoti>
        <S.InfoIcon />
        <S.CartAmountNotiText>
          총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.
        </S.CartAmountNotiText>
      </S.CartAmountNoti>

      <S.UpperCartAmountInfoWrapper>
        <S.CartAmountInfo>
          <S.AmountText>주문 금액</S.AmountText>{" "}
          <S.Amount>{orderAmount.toLocaleString()}원</S.Amount>
        </S.CartAmountInfo>
        <S.CartAmountInfo>
          <S.AmountText>배송비</S.AmountText> <S.Amount>{deliveryCost.toLocaleString()}원</S.Amount>
        </S.CartAmountInfo>
      </S.UpperCartAmountInfoWrapper>
      <S.LowerCartAmountInfoWrapper>
        <S.CartAmountInfo>
          <S.AmountText>총 주문 금액</S.AmountText>{" "}
          <S.Amount>{totalOrderAmount.toLocaleString()}원</S.Amount>
        </S.CartAmountInfo>
      </S.LowerCartAmountInfoWrapper>
    </S.CartAmountContainer>
  );
}

const S = {
  CartAmountContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
  `,

  CartAmountNoti: styled.p`
    font-size: 14px;
    color: #888;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 4px;
  `,

  UpperCartAmountInfoWrapper: styled.div`
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  `,

  LowerCartAmountInfoWrapper: styled.div`
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  `,

  CartAmountInfo: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 12px;
  `,

  AmountText: styled.span`
    font-size: 16px;
    font-weight: 700;
  `,

  Amount: styled.span`
    font-size: 24px;
    font-weight: 700;
  `,
  InfoIcon: styled(InfoIcon)`
    width: 16px;
    height: 16px;
  `,
  CartAmountNotiText: styled.span`
    font-size: 12px;
    font-weight: 500;
    line-height: 15px;
    color: rgba(10, 13, 19, 1);
  `,
};
