import { useRecoilValue } from 'recoil';
import { totalPriceSelector } from '../../../../recoil/cartState';
import * as Styled from './TotalPrice.styled';

const TotalPrice = () => {
  const totalProductPrice = useRecoilValue(totalPriceSelector);
  const deliveryFee = totalProductPrice ? 3000 : 0;

  return (
    <Styled.PriceSection>
      <Styled.TitleParagraph>결제예상금액</Styled.TitleParagraph>
      <Styled.PriceDiv>
        <Styled.PriceParagraph>총 상품가격</Styled.PriceParagraph>
        <Styled.PriceParagraph>{totalProductPrice.toLocaleString('ko-KR')}원</Styled.PriceParagraph>
      </Styled.PriceDiv>
      <Styled.PriceDiv>
        <Styled.PriceParagraph>총 배송비</Styled.PriceParagraph>
        <Styled.PriceParagraph>{deliveryFee.toLocaleString('ko-KR')}원</Styled.PriceParagraph>
      </Styled.PriceDiv>
      <Styled.PriceDiv>
        <Styled.PriceParagraph>총 주문금액</Styled.PriceParagraph>
        <Styled.PriceParagraph>
          {(totalProductPrice + deliveryFee).toLocaleString('ko-KR')}원
        </Styled.PriceParagraph>
      </Styled.PriceDiv>
      <Styled.OrderButton type="button">주문하기</Styled.OrderButton>
    </Styled.PriceSection>
  );
};

export default TotalPrice;
