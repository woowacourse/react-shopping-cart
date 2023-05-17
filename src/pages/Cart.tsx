import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { styled } from "styled-components";
import {
  Header,
  Page,
  CartProductList,
  TotalPriceTable,
  Button,
} from "../components";
import { cartProductsSelector } from "../recoil/selector";
import { ROUTER_PATH } from "../router";
import { ProductListType } from "../types/domain";

const Cart = () => {
  const navigate = useNavigate();
  const cartProducts = useRecoilValue<ProductListType>(cartProductsSelector);

  const handleButtonClicked = () => {
    navigate(ROUTER_PATH.Main);
  };

  return (
    <>
      <Header />
      <Page>
        <TitleBox>장바구니</TitleBox>

        {cartProducts.length === 0 ? (
          <EmptyContainer>
            <span>🛒</span>
            <p>장바구니가 텅 비었어요</p>
            <Button onClick={handleButtonClicked}>상품 담으러 가기</Button>
          </EmptyContainer>
        ) : (
          <Container>
            <CartProductList />
            <TotalPriceTable />
          </Container>
        )}
      </Page>
    </>
  );
};

const TitleBox = styled.div`
  align-self: center;
  width: 85%;
  height: 40px;

  font-weight: 700;
  font-size: 25px;
  text-align: center;
  border-bottom: 4px solid var(--dark-gray);
`;

const Container = styled.section`
  display: flex;
  padding: 40px 8%;
  justify-content: space-between;

  @media screen and (max-width: 800px) {
    flex-direction: column;
  }
`;

const EmptyContainer = styled.section`
  display: flex;
  flex-direction: column;
  width: 400px;
  align-items: center;
  align-self: center;

  text-align: center;
  padding: 10% 0;

  & > span {
    font-size: 60px;
    margin-bottom: 25px;
  }
  & > p {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 25px;
  }
`;

export default Cart;
