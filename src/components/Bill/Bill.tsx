import { styled } from 'styled-components';

const Bill = () => {
  return (
    <Wrapper>
      <SubTitle>결제예상금액</SubTitle>
      <DetailWrapper>
        <Detail>
          총 상품가격 <span>21,700원</span>
        </Detail>
        <Detail>
          총 배송비 <span>3,000원</span>
        </Detail>
        <TotalAmount>
          총 주문금액 <span>24,700원</span>
        </TotalAmount>
        <OrderButton>주문하기</OrderButton>
      </DetailWrapper>
    </Wrapper>
  );
};

export default Bill;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  height: 410px;
  width: 448px;

  border: 1px solid #dddddd;
  margin-bottom: 128px;
`;

const SubTitle = styled.div`
  width: 100%;

  border-bottom: 3px solid #dddddd;

  padding: 22px 30px;

  color: #333333;
  font-size: 24px;
`;

const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 24px;

  width: 100%;

  padding: 32px;
`;

const Detail = styled.div`
  display: flex;
  justify-content: space-between;

  font-size: 20px;
  font-weight: bold;
`;

const TotalAmount = styled(Detail)`
  margin: 24px 0px;
`;

const OrderButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 73px;
  width: 388px;

  color: #fff;
  font-size: 24px;

  background-color: #333333;
`;
