import SelectBox from '../../../common/selectBox/SelectBox';
import Separator from '../../../common/separator/Separator';
import * as S from './CouponModal.styles';
import Close from '/assets/Close.svg';

function CouponModal() {
  return (
    <S.Overlay>
      <S.Container>
        <S.Header>
          <S.Title>쿠폰을 선택해 주세요</S.Title>
          <img src={Close} />
        </S.Header>
        <S.Notice>
          <img src="./assets/Notification.svg" />
          <S.NoticeText>쿠폰은 최대 2개까지 사용할 수 있습니다.</S.NoticeText>
        </S.Notice>
        <S.CouponContainer>
          <Separator />
          <S.CouponBox>
            <SelectBox selected={false} />
            <S.Name>5,000원 할인 쿠폰</S.Name>
          </S.CouponBox>
          <S.Description>
            <S.DescriptionText>만료일: 2024년 11월 30일</S.DescriptionText>
            <S.DescriptionText>최소 주문 금액: 100,000원</S.DescriptionText>
          </S.Description>
        </S.CouponContainer>
        <S.CouponContainer>
          <Separator />
          <S.CouponBox>
            <SelectBox selected={true} />
            <S.Name>5,000원 할인 쿠폰</S.Name>
          </S.CouponBox>
          <S.Description>
            <S.DescriptionText>만료일: 2024년 11월 30일</S.DescriptionText>
            <S.DescriptionText>최소 주문 금액: 100,000원</S.DescriptionText>
          </S.Description>
        </S.CouponContainer>
        <S.CouponContainer>
          <Separator />
          <S.CouponBox>
            <SelectBox selected={true} />
            <S.Name>5,000원 할인 쿠폰</S.Name>
          </S.CouponBox>
          <S.Description>
            <S.DescriptionText>만료일: 2024년 11월 30일</S.DescriptionText>
            <S.DescriptionText>최소 주문 금액: 100,000원</S.DescriptionText>
          </S.Description>
        </S.CouponContainer>
        <S.CouponContainer>
          <Separator />
          <S.CouponBox>
            <SelectBox selected={false} />
            <S.Name>5,000원 할인 쿠폰</S.Name>
          </S.CouponBox>
          <S.Description>
            <S.DescriptionText>만료일: 2024년 11월 30일</S.DescriptionText>
            <S.DescriptionText>최소 주문 금액: 100,000원</S.DescriptionText>
          </S.Description>
        </S.CouponContainer>
        <S.Button>총 6,000원 할인 쿠폰 사용하기</S.Button>
      </S.Container>
    </S.Overlay>
  );
}

export default CouponModal;
