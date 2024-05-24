import CheckBox from '../../CheckBox/CheckBox';
import { CouponContainer, Notification, CouponContent, CouponBox, CouponDetails } from './CouponList.style';
import Caution from '../../../assets/caution.svg';

export default function CouponList() {
  return (
    <CouponContainer>
      <Notification>
        <img className="notification-img" src={Caution} />
        <span className="notification-text">쿠폰은 최대 2개까지 사용할 수 있습니다.</span>
      </Notification>

      <CouponContent>
        <CouponBox>
          <CheckBox text="5,000원 할인 쿠폰" isCheck={false} onClick={() => {}} />
          <CouponDetails>
            <span>만료일: 2024년 11월 30일</span>
            <span>최소 주문 금액: 100,000원</span>
          </CouponDetails>
        </CouponBox>
        <CouponBox>
          <CheckBox text="2개 구매 시 1개 무료 쿠폰" isCheck={false} onClick={() => {}} />
          <CouponDetails>
            <span>만료일: 2024년 5월 30일</span>
          </CouponDetails>
        </CouponBox>
        <CouponBox>
          <CheckBox text="5만원 이상 구매 시 무료 배송 쿠폰" isCheck={false} onClick={() => {}} />
          <CouponDetails>
            <span>만료일: 2024년 8월 31일</span>
            <span>최소 주문 금액: 50,000원</span>
          </CouponDetails>
        </CouponBox>
        <CouponBox>
          <CheckBox text="미라클모닝 30% 할인 쿠폰" isCheck={false} onClick={() => {}} />
          <CouponDetails>
            <span>만료일: 2024년 7월 31일</span>
            <span>사용 가능 시간: 오전 4시부터 7시까지</span>
          </CouponDetails>
        </CouponBox>
      </CouponContent>
    </CouponContainer>
  );
}
