import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useCheckBox } from "../../hooks/useCheckBox";

import Button from "../../components/common/Button";
import CheckBox from "../../components/common/CheckBox";
import Spinner from "../../components/common/Spinner";
import CartItem from "./CartItem";
import PaymentBox from "./PaymentBox";

import {
  deleteCartItemByIdList,
  getCartItemList,
  postCartItemByProductList,
} from "../../store/cartReducer";

import {
  StyledCartItemList,
  StyledLabel,
  StyledListTitle,
  StyledPageContentContainer,
  StyledPageTitle,
  StyledSelectedProductManagementContainer,
} from "./index.styled";

function ShoppingCartPage() {
  const dispatch = useDispatch();

  const {
    data: cartItemList,
    loading: isCartItemListLoading,
    errorMessage: cartItemErrorMessage,
  } = useSelector((state) => state.cartReducer);

  const cartItemIdList = cartItemList?.map((cartItem) => cartItem.id);
  const {
    selectedList,
    isSelected,
    isAllSelected,
    handleCheckBoxClick,
    handleSelectAllCheckBoxClick,
  } = useCheckBox(cartItemIdList);

  const selectedCartItemList = cartItemList?.filter((cartItem) =>
    selectedList.includes(cartItem.id)
  );

  const paymentAmount = selectedCartItemList?.reduce((prev, cartItem) => {
    return prev + cartItem.price * cartItem.quantity;
  }, 0);

  const handleSelectedItemDeleteButtonClick = () => {
    if (selectedList.length === 0) {
      alert("선택된 상품이 없습니다.");
      return;
    }
    // eslint-disable-next-line no-restricted-globals
    if (confirm("선택한 상품을 모두 삭제하시겠습니까?")) {
      dispatch(deleteCartItemByIdList([...selectedCartItemList]));
    }
  };

  const updateCartItemQuantity = (id) => (quantity) => {
    dispatch(postCartItemByProductList([{ id, quantity }]));
  };

  const deleteCartItem = (id) => () => {
    dispatch(deleteCartItemByIdList([id]));
  };

  useEffect(() => {
    dispatch(getCartItemList());
  }, []);

  if (isCartItemListLoading) return <Spinner />;
  if (cartItemErrorMessage)
    return <div>😱 Error: {cartItemErrorMessage} 😱</div>;

  return (
    <div>
      <StyledPageTitle>장바구니</StyledPageTitle>
      <StyledPageContentContainer>
        <div>
          <StyledSelectedProductManagementContainer>
            <StyledLabel>
              <CheckBox
                checked={isAllSelected}
                onClick={handleSelectAllCheckBoxClick}
              />
              전체 선택
            </StyledLabel>
            <Button
              width="117px"
              height="50px"
              borderStyle="1px solid"
              borderColor="grey"
              onClick={handleSelectedItemDeleteButtonClick}
            >
              선택 상품 삭제
            </Button>
          </StyledSelectedProductManagementContainer>
          <div>
            <StyledListTitle>
              장바구니 상품목록({cartItemList.length}개)
            </StyledListTitle>
            <StyledCartItemList>
              {cartItemList.map((product) => (
                <CartItem
                  key={product.id}
                  product={product}
                  selected={isSelected(product.id)}
                  onClickCheckBox={handleCheckBoxClick(product.id)}
                  updateQuantity={updateCartItemQuantity(product.id)}
                  deleteSelf={deleteCartItem(product.id)}
                />
              ))}
            </StyledCartItemList>
          </div>
        </div>
        <PaymentBox
          amount={paymentAmount}
          quantity={selectedCartItemList.length}
        />
      </StyledPageContentContainer>
    </div>
  );
}

export default ShoppingCartPage;
