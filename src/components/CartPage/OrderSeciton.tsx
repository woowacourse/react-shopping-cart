import { useRecoilState } from "recoil";
import styled from "styled-components";
import { cartState } from "../../atoms/cartState";

export default function OrderSection() {
  const [cartsData, setCartsData] = useRecoilState(cartState);

  function getTotalProductPrice() {
    return cartsData.reduce(
      (totalPrice, currentPrice) =>
        totalPrice + currentPrice.quantity * currentPrice.product.price,
      0
    );
  }

  return (
    <Container>
      <OrderTitle>결제예상금액</OrderTitle>
      <ProductInfo>
        <InfoTitle>총 상품가격</InfoTitle>
        <InfoPrice>{getTotalProductPrice()}</InfoPrice>
      </ProductInfo>
      <ProductInfo>
        <InfoTitle>총 배송비</InfoTitle>
        <InfoPrice>3,000</InfoPrice>
      </ProductInfo>
      <TotalProduct>
        <InfoTitle>총 주문금액</InfoTitle>
        <InfoPrice>{getTotalProductPrice() + 3000}</InfoPrice>
      </TotalProduct>
      <OrderButton>주문하기</OrderButton>
    </Container>
  );
}

const Container = styled.article`
  width: 44.8rem;
  height: 41rem;

  padding: 3.5rem 3.6rem;
  margin-top: 5.8rem;
  border: 0.1rem solid ${({ theme }) => theme.colors.gray100};
`;

const OrderTitle = styled.h3`
  height: 4.6rem;

  ${({ theme }) => theme.fonts.order_title};

  color: ${({ theme }) => theme.colors.gray100};
  border-bottom: 0.3rem solid ${({ theme }) => theme.colors.gray100};
`;

const ProductInfo = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;

  margin-top: 2rem;
`;

const InfoTitle = styled.strong`
  ${({ theme }) => theme.fonts.order_info}
  color: ${({ theme }) => theme.colors.primary};
`;

const InfoPrice = styled.div`
  ${({ theme }) => theme.fonts.order_info}
  color: ${({ theme }) => theme.colors.primary};
`;

const TotalProduct = styled(ProductInfo)`
  margin-top: 4.1rem;
`;

const OrderButton = styled.button`
  width: 38rem;
  height: 7.3rem;

  margin-top: 4.6rem;

  ${({ theme }) => theme.fonts.h2}
`;
