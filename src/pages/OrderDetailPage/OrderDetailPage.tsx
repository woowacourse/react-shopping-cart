import * as Styled from './OrderDetailPage.styles';
import PageTitle from '../../components/commons/PageTitle/PageTitle';
import ItemGroup from '../../components/commons/ItemGroup/ItemGroup';
import ProductListItem from '../../components/commons/ProductListItem/ProductListItem';
import Button from '../../components/commons/Button/Button';
import leftArrowSVG from '../../assets/svgs/left-arrow.svg';
import { COLORS } from '../../constants';
import TotalPrice from '../../components/OrderDetailPage/TotalPrice/TotalPrice';

const OrderDetailPage = () => {
  return (
    <Styled.OrderListPage>
      <Styled.PageWrapper>
        <Styled.PageTitleWrapper>
          <PageTitle>주문내역상세</PageTitle>
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
        <Styled.PageBottom>
          <Button size="MD" backgroundColor={COLORS.BROWN_500}>
            <img src={leftArrowSVG} alt="주문목록 돌아가기" />
            &nbsp;&nbsp;주문목록 돌아가기
          </Button>
          <TotalPrice title="결제금액 정보" priceLabel="총 결제금액" price="325,600" />
        </Styled.PageBottom>
      </Styled.PageWrapper>
    </Styled.OrderListPage>
  );
};

export default OrderDetailPage;
