import React from "react";

import IconButton from "../../components/common/IconButton";

import shoppingCartIconBlack from "../../asset/shopping-cart-icon-black.svg";

function AddToCartButton() {
  return (
    <IconButton
      title="장바구니 담기"
      onClick={(e) => {
        e.stopPropagation();
        alert("🛒아직입니다~~^^🛒");
      }}
      iconImgSrc={shoppingCartIconBlack}
      iconImgAlt="장바구니 담기"
      width="30px"
    />
  );
}

export default AddToCartButton;
