import styled from 'styled-components';
import theme from 'styles/theme';

const PaymentsAmount = ({ children }) => {
  const onClick = () => {
    alert('주문하였습니다!!');
  };

  return (
    <StyledRoot>
      <Header>결제 예상금액</Header>
      <Bottom>
        <TotalPrice>
          <UnderLineBox>
            <div>총 결제액</div>
          </UnderLineBox>
          <UnderLineBox> {children}</UnderLineBox>
        </TotalPrice>
        <OrderButton onClick={onClick}>주문하기</OrderButton>
      </Bottom>
    </StyledRoot>
  );
};

const StyledRoot = styled.div`
  grid-area: pa;

  width: 448px;
  height: 318px;
`;

const Header = styled.div`
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 33px;

  letter-spacing: 0.5px;

  padding: 20px;
  border: 1px silver solid;
`;

const Bottom = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;

  padding: 20px;
  border: 1px silver solid;
`;

const TotalPrice = styled.div`
  display: flex;
  width: 100%;
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 27px;

  text-align: center;
  letter-spacing: 0.5px;

  flex-direction: row;
  justify-content: space-between;

  margin-bottom: 60px;
`;

const UnderLineBox = styled.div`
  background: linear-gradient(#fff 70%, ${theme.colors.primary} 30%);
`;

const OrderButton = styled.button`
  width: 388px;
  height: 73px;
  font-size: 24px;
  color: white;
  background-color: ${theme.colors.primary};
`;

export default PaymentsAmount;
