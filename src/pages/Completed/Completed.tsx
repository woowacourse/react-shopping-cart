import React from 'react';
import { useRecoilValue } from 'recoil';
import { totalCountSelector, totalPriceSelector } from '../../recoil/selectors';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import { URL_PATH } from '../../constants/UrlPath';
import * as S from './Completed.styled';

function Completed() {
  const { totalItemTypeCount, totalCount } = useRecoilValue(totalCountSelector);
  const { calculatedTotalAmount } = useRecoilValue(totalPriceSelector);

  return (
    <>
      <Header headerIconType="back" />
      <S.CompletedContainer>
        <S.Title>주문 확인</S.Title>
        <S.SubTitle>
          총 {totalItemTypeCount}종류의 상품 {totalCount}개를 주문합니다.
          <br />
          최종 결제 금액을 확인해 주세요.
        </S.SubTitle>
        <S.TotalAmountLabel>총 결제 금액</S.TotalAmountLabel>
        <S.TotalAmountStyle>
          {calculatedTotalAmount.toLocaleString()}원
        </S.TotalAmountStyle>
      </S.CompletedContainer>

      <Footer isDisabled={true} url={URL_PATH.cart} />
    </>
  );
}

export default Completed;
