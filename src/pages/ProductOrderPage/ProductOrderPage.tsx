import PageTitle from '../../components/commons/PageTitle/PageTitle';
import PaymentCheckout from '../../components/commons/PaymentCheckout/PaymentCheckout';
import ProductListItem from '../../components/commons/ProductListItem/ProductListItem';
import * as Styled from './ProductOrderPage.styles';

const ProductOrderPage = () => {
  return (
    <Styled.ProductOrderPage>
      <Styled.Header>
        <PageTitle>장바구니</PageTitle>
      </Styled.Header>
      <Styled.PageWrapper>
        <Styled.Container>
          <Styled.OrderContainer>
            <Styled.OrderHeaderWrapper>
              <Styled.OrderHeader>배송상품 (3개)</Styled.OrderHeader>
            </Styled.OrderHeaderWrapper>
            <Styled.OrderItemList>
              <Styled.OrderItemWrapper>
                <ProductListItem size="SM" productName="상품이름" productPrice="18,900" productQuantity="1" />
              </Styled.OrderItemWrapper>
              <Styled.OrderItemWrapper>
                <ProductListItem size="SM" productName="상품이름" productPrice="18,900" productQuantity="1" />
              </Styled.OrderItemWrapper>
              <Styled.OrderItemWrapper>
                <ProductListItem size="SM" productName="상품이름" productPrice="18,900" productQuantity="1" />
              </Styled.OrderItemWrapper>
            </Styled.OrderItemList>
          </Styled.OrderContainer>
        </Styled.Container>
        <Styled.PaymentCheckoutWrapper>
          <PaymentCheckout title="결제예상금액" priceLabel="결제예상금액" price="21,700" buttonText="주문하기(2개)" />
        </Styled.PaymentCheckoutWrapper>
      </Styled.PageWrapper>
    </Styled.ProductOrderPage>
  );
};

export default ProductOrderPage;
