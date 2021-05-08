import * as Styled from './OrderListPage.styles';
import PageTitle from '../../components/commons/PageTitle/PageTitle';
import ItemGroup from '../../components/commons/ItemGroup/ItemGroup';
import ProductListItem from '../../components/commons/ProductListItem/ProductListItem';
import Button from '../../components/commons/Button/Button';

const OrderListPage = () => {
  return (
    <Styled.OrderListPage>
      <Styled.PageWrapper>
        <Styled.PageTitleWrapper>
          <PageTitle>주문목록</PageTitle>
        </Styled.PageTitleWrapper>
        <Styled.ItemGroupWrapper>
          <ItemGroup orderNumber="1">
            <Styled.OrderWrapper>
              <ProductListItem size="MD" productName="상품이름" productPrice="18,900" productQuantity="1" />
              <Button size="SM">장바구니 담기</Button>
            </Styled.OrderWrapper>
            <Styled.OrderWrapper>
              <ProductListItem size="MD" productName="상품이름" productPrice="18,900" productQuantity="1" />
              <Button size="SM">장바구니 담기</Button>
            </Styled.OrderWrapper>
            <Styled.OrderWrapper>
              <ProductListItem size="MD" productName="상품이름" productPrice="18,900" productQuantity="1" />
              <Button size="SM">장바구니 담기</Button>
            </Styled.OrderWrapper>
          </ItemGroup>
        </Styled.ItemGroupWrapper>
        <Styled.ItemGroupWrapper>
          <ItemGroup orderNumber="2">
            <Styled.OrderWrapper>
              <ProductListItem size="MD" productName="상품이름" productPrice="18,900" productQuantity="1" />
              <Button size="SM">장바구니 담기</Button>
            </Styled.OrderWrapper>
          </ItemGroup>
        </Styled.ItemGroupWrapper>
      </Styled.PageWrapper>
    </Styled.OrderListPage>
  );
};

export default OrderListPage;
