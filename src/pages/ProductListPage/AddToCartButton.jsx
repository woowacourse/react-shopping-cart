import React from "react";

import IconButton from "../../components/common/IconButton";

import shoppingCartIconBlack from "../../asset/shopping-cart-icon-black.svg";

function AddToCartButton({ ...props }) {
  return (
    <IconButton
      title="장바구니 담기"
      iconImgSrc={shoppingCartIconBlack}
      iconImgAlt="장바구니 담기"
      width="30px"
      {...props}
    />
  );
}

export default AddToCartButton;
