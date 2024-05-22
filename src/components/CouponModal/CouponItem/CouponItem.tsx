import Checkbox from '../../Checkbox/Checkbox';
import * as S from './styled';

const CouponItem = () => {
  return (
    <S.Container>
      <S.Hr />
      <S.CouponItemHeader>
        <Checkbox
          id="1"
          isChecked={false}
          onClick={() => {
            console.log('click');
          }}
        ></Checkbox>
        <S.CouponName>5,000원 할인 쿠폰</S.CouponName>
      </S.CouponItemHeader>
      <S.CouponItemContent>
        <S.CouponDescription>만료일: 2024년 11월 30일</S.CouponDescription>
      </S.CouponItemContent>
    </S.Container>
  );
};

export default CouponItem;
