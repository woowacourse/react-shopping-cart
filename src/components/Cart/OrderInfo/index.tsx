import { useRecoilValue } from 'recoil';
import { selectedCartItemTotal } from 'src/recoil/cartList';
import { convertKORWon } from 'src/utils';
import { DELEIVERY_COST } from 'src/utils/constants';
import { styled } from 'styled-components';

const OrderInfo = () => {
  const totalCartItemPrice = useRecoilValue(selectedCartItemTotal);

  return (
    <OrderWrapper>
      <OrderTitleContainer>
        <p>결제 예상 금액</p>
      </OrderTitleContainer>
      <OrderInfoContainer>
        <div>
          <p>총 상품 가격</p>
          <p>{convertKORWon(totalCartItemPrice)}</p>
        </div>
        <div>
          <p>총 배송비</p>
          <p>{convertKORWon(DELEIVERY_COST)}</p>
        </div>
        <div>
          <p>총 주문 금액</p>
          <p>{convertKORWon(totalCartItemPrice + DELEIVERY_COST)}</p>
        </div>
      </OrderInfoContainer>
      <OrderButtonContainer>
        <button>주문하기</button>
      </OrderButtonContainer>
    </OrderWrapper>
  );
};

export default OrderInfo;

const OrderWrapper = styled.div`
  width: 448px;
  height: 410px;
  border: 1px solid #dddddd;
  margin: 90px auto;
`;

const OrderTitleContainer = styled.div`
  padding: 22px 0 22px 30px;
  border-bottom: 3px solid #dddddd;

  p {
    font: ${(props) => props.theme.font.subTitle};
  }
`;

const OrderInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  margin: 30px 0 0 0;
  padding: 0 30px;

  div {
    display: flex;
    justify-content: space-between;

    p {
      font: ${(props) => props.theme.font.emphasizeFont};
    }

    &:last-child {
      margin-top: 15px;
    }
  }
`;

const OrderButtonContainer = styled.div`
  margin: 40px auto 0 auto;
  width: 388px;

  button {
    width: 100%;
    height: 73px;
    text-align: center;
    background: ${(props) => props.theme.color.primary};
    color: white;

    &:hover {
      cursor: pointer;
    }
  }
`;
