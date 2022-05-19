import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { useCartItemList } from "../../hooks/useCartItemList";

import { deleteCartItem } from "../../store/actions";

import Button from "../../components/common/Button";
import CheckBox from "../../components/common/CheckBox";
import Spinner from "../../components/common/Spinner";
import CartProductListItem from "./CartProductListItem";
import PaymentBox from "./PaymentBox";
import { useCheckBox } from "../../hooks/useCheckBox";

function ShoppingCartPage() {
  const dispatch = useDispatch();
  const { cartItemList, isLoading, errorMessage } = useCartItemList();

  const cartItemIdList = cartItemList?.map((cartItem) => cartItem.id);
  const {
    selectedList,
    isSelected,
    isAllSelected,
    handleCheckBoxClick,
    handleSelectAllCheckBoxClick,
  } = useCheckBox(cartItemIdList);

  const paymentAmount = cartItemList?.reduce((prev, cartItem) => {
    return prev + cartItem.price * cartItem.quantity;
  }, 0);

  if (isLoading) return <Spinner />;
  if (errorMessage) return <div>😱 Error: {errorMessage} 😱</div>;

  return (
    <div>
      <PageTitle>장바구니</PageTitle>
      <ContentContainer>
        <div>
          <SelectedProductManagementContainer>
            <Label>
              <CheckBox
                checked={isAllSelected}
                onClick={handleSelectAllCheckBoxClick}
              />
              전체 선택
            </Label>
            <Button
              width="117px"
              height="50px"
              borderStyle="1px solid"
              borderColor="grey_300"
              onClick={() => {
                if (selectedList.length === 0) {
                  alert("선택된 상품이 없습니다.");
                  return;
                }
                // eslint-disable-next-line no-restricted-globals
                if (confirm("선택한 상품을 모두 삭제하시겠습니까?")) {
                  dispatch(deleteCartItem([...selectedList]));
                }
              }}
            >
              선택 상품 삭제
            </Button>
          </SelectedProductManagementContainer>
          <div>
            <ListTitle>장바구니 상품목록({cartItemList.length}개)</ListTitle>
            <CartProductList>
              {cartItemList.map((product) => (
                <CartProductListItem
                  key={product.id}
                  product={product}
                  selected={isSelected(product.id)}
                  handleCheckBoxClick={handleCheckBoxClick(product.id)}
                />
              ))}
            </CartProductList>
          </div>
        </div>
        <PaymentBox amount={paymentAmount} quantity={cartItemList.length} />
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
