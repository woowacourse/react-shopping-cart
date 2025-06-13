import styled from "@emotion/styled";
import { useLocation, useNavigate } from "react-router-dom";
import { Flex, Header } from "../../components/common";
import { formatKRWString } from "../../utils/formatKRWString";
import { useEffect } from "react";

const SuccessConfirmPage = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const { totalPrice, typeCount, totalCount } = location.state || {};
  const navigateToCart = () => {
    navigate("/");
  };

  useEffect(() => {
    if (!location.state) {
      alert("잘못된 접근입니다. 장바구니 페이지로 돌아갑니다.");
      navigate("/", { replace: true });
    }
  }, [location.state, navigate]);

  if (!location.state) {
    return null;
  }

  return (
    <>
      <Header />
      <Container>
        <Flex justifyContent="center" alignItems="center" gap="lg">
          <InfoTitle>결제 확인</InfoTitle>
          <div>
            <Description
              aria-label={`총 ${typeCount}종류의 상품 ${totalCount}개를 주문합니다.`}
            >
              총 {typeCount}종류의 상품 {totalCount}개를 주문했습니다.
            </Description>
            <Description>최종 결제 금액을 확인해 확인해 주세요.</Description>
          </div>
          <Subtitle>총 결제 금액</Subtitle>
          <InfoTitle
            aria-label={`총 결제 금액은 ${formatKRWString(totalPrice)} 입니다.`}
          >
            {formatKRWString(totalPrice)}
          </InfoTitle>
        </Flex>
      </Container>
      <PayButton onClick={navigateToCart} isDisabled={false}>
        장바구니로 돌아가기
      </PayButton>
    </>
  );
};

export default SuccessConfirmPage;

const Container = styled(Flex)`
  padding: 36px 24px;
  height: calc(100vh - 116px);
`;

const InfoTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
`;

const Subtitle = styled.h2`
  font-size: 16px;
  font-weight: bold;
`;

const Description = styled.p`
  font-size: 12px;
`;

const PayButton = styled.button<{ isDisabled: boolean }>`
  position: sticky;
  bottom: 0;
  width: 100%;
  padding: 16px;
  background-color: ${({ isDisabled }) => (isDisabled ? "#BDBDBD" : "#333")};
  color: white;
  cursor: ${({ isDisabled }) => (isDisabled ? "not-allowed" : "pointer")};
  border-radius: 0px;
`;
