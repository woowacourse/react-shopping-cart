import React from "react";
import styled from "styled-components";

import Button from "../../components/common/Button";
import CheckBox from "../../components/common/CheckBox";
import CartProductListItem from "./CartProductListItem";
import PaymentBox from "./PaymentBox";

const dummyProduct = {
  id: 1,
  thumbnailUrl: "https://cdn-mart.baemin.com/goods/85/1537405626217m0.jpg",
  name: "PET보틀-정사각(420ml)",
  price: 43400,
};

function ShoppingCartPage() {
  const products = Array(10).fill(dummyProduct);

  return (
    <div>
      <PageTitle>장바구니</PageTitle>
      <ContentContainer>
        <div>
          <SelectedProductManagementContainer>
            <Label>
              <CheckBox />
              전체 선택
            </Label>
            <Button
              width="117px"
              height="50px"
              borderStyle="1px solid"
              borderColor="grey_300"
            >
              선택 상품 삭제
            </Button>
          </SelectedProductManagementContainer>
          <div>
            <ListTitle>장바구니 상품목록(3개)</ListTitle>
            <CartProductList>
              {products.map((product) => (
                <CartProductListItem key={product.id} product={dummyProduct} />
              ))}
            </CartProductList>
          </div>
        </div>
        <PaymentBox />
      </ContentContainer>
    </div>
  );
}

const PageTitle = styled.h2`
  margin-bottom: 30px;

  text-align: center;
  font-weight: 700;
  font-size: 32px;
  line-height: 37px;
  color: ${({ theme }) => theme.color.grey_700};
`;

const ContentContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  width: 1320px;
  padding: 50px 25px 0;

  border-top: 4px solid ${({ theme }) => theme.color.grey_700};

  div:first-child {
    width: 736px;
  }
`;

const SelectedProductManagementContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  margin-bottom: 26px;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 12px;

  :hover {
    cursor: pointer;
  }
`;

const ListTitle = styled.h3`
  height: 40px;
  margin-bottom: 16px;

  font-size: 20px;
  line-height: 33px;
  letter-spacing: 0.5px;
  color: ${({ theme }) => theme.color.grey_700};
`;

const CartProductList = styled.ul`
  display: flex;
  flex-direction: column;

  width: 100%;

  border: none;
  border-top: 4px solid ${({ theme }) => theme.color.grey_300};
`;

export default ShoppingCartPage;
