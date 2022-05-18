import React from "react";

import IconButton from "../../components/common/IconButton";

import trashCanIcon from "../../asset/trash-can-icon.svg";

function DeleteFromCartButton() {
  return (
    <IconButton
      title="장바구니에서 삭제하기"
      onClick={(e) => {
        e.stopPropagation();
        alert("🗑 아직입니다~~^^ 🗑");
      }}
      iconImgSrc={trashCanIcon}
      iconImgAlt="쓰레기통 아이콘"
      width="24px"
    />
  );
}

export default DeleteFromCartButton;
