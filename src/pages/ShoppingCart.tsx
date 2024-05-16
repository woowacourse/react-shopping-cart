import PageTitle from "../components/PageTitle";
import styled from "styled-components";
import CartItemList from "../components/CartItemList/index";

const ShoppingCart = () => {
  return (
    <PageContainer>
      <PageTitle title="장바구니" subTitle="현재 2종류의 상품이 담겨있습니다." />
      <CartItemList />
    </PageContainer>
  );
};

export default ShoppingCart;

const PageContainer = styled.div`
  padding: 36px 25px 104px 36px;
  background-color: white;
`;
