import * as S from "./CartSection.styles";
import Card from "./CartProducts/Card";
import Header from "./Header";
import CheckBox from "../../common/CheckBox";
import PriceSection from "./PriceSection";
import Button from "../../common/Button";
import { css } from "@emotion/react";
import useGetCartItem from "../../../hooks/useGetCartItem";

const CartSection = () => {
  const { cartItems, refetch } = useGetCartItem();

  return (
    <S.Container>
      <Header />
      <CheckBox label="전체 선택" isChecked={false} onChange={() => {}} />
      <S.CartList>
        {cartItems?.map((cartItem) => (
          <Card cartItem={cartItem} key={cartItem.id} onRefetch={refetch} />
        ))}
      </S.CartList>

      <PriceSection />
      <Button
        title="주문 확인"
        onClick={() => {}}
        css={css`
          padding: 24px 0;
          background-color: #000;
          color: #fff;
          font-weight: 700;
          font-size: 16px;
        `}
      />
    </S.Container>
  );
};

export default CartSection;
