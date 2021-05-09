import React from "react";
import CheckBox from "../../@shared/CheckBox/CheckBox";
import NumberInput from "../../@shared/NumberInput/NumberInput";
import TrashIcon from "../../@shared/TrashIcon/TrashIcon";
import * as S from "./CartItem.styled";

const CartItem = () => (
  <S.CartItem>
    <S.Detail>
      <CheckBox id="check1" name="check1" label="check1" />
      <S.Img
        src="https://cdn-mart.baemin.com/goods/85/1537405626217m0.jpg"
        alt="야채바삭 김말이"
      />
      <S.Name>[든든] 야채바삭 김말이 700g</S.Name>
    </S.Detail>
    <S.Control>
      <TrashIcon />
      <NumberInput value="1" onChange={() => {}} />
      <span>5,100원</span>
    </S.Control>
  </S.CartItem>
);

export default CartItem;
