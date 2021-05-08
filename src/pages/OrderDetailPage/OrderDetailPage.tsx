import * as Styled from './OrderDetailPage.styles';
import PageTitle from '../../components/commons/PageTitle/PageTitle';
import ItemGroup from '../../components/commons/ItemGroup/ItemGroup';
import ProductListItem from '../../components/commons/ProductListItem/ProductListItem';
import Button from '../../components/commons/Button/Button';

const OrderDetailPage = () => {
  return (
    <Styled.OrderListPage>
      <Styled.pageWrapper>
        <Styled.pageTitleWrapper>
          <PageTitle>주문내역상세</PageTitle>
        </Styled.pageTitleWrapper>
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
      </Styled.pageWrapper>
    </Styled.OrderListPage>
  );
};

export default OrderDetailPage;
