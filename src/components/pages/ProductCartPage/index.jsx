import React, { useState } from "react";

import CheckBox from "../../common/CheckBox";
import PaymentAmount from "./PaymentAmount";
import ProductCartList from "./ProductCartList";
import {
  CartListControlContainer,
  CartPageContainer,
  CartPageHeader,
  CartPageList,
  CartPagePayment,
  DeleteCartButton,
} from "./styled";

function ProductCartPage() {
  const [isChecked, setIsChecked] = useState(false);

  const handleChangeCheckbox = () => {
    setIsChecked((prev) => !prev);
  };

  return (
    <CartPageContainer>
      <CartPageHeader>장바구니</CartPageHeader>
      <CartPageList>
        <CartListControlContainer>
          <CheckBox
            isChecked={isChecked}
            handleChangeCheckbox={handleChangeCheckbox}
          >
            선택해제
          </CheckBox>
          <DeleteCartButton>상품 삭제</DeleteCartButton>
        </CartListControlContainer>
        <ProductCartList cartList={null} />
      </CartPageList>
      <CartPagePayment>
        <PaymentAmount position="sticky" />
      </CartPagePayment>
    </CartPageContainer>
  );
}

export default ProductCartPage;
