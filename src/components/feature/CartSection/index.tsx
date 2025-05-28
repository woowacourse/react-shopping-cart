import * as S from "./CartSection.styles";
import Card from "./CartProducts/Card";
import Header from "./Header";
import CheckBox from "../../common/CheckBox";
import PriceSection from "./PriceSection";
import Button from "../../common/Button";
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { CartProduct } from "../../../type/cart";
import { getCartProduct } from "../../../api/cart/getCartProduct";

const CartSection = () => {
  const [cartItems, setCartItems] = useState<CartProduct[]>();

  useEffect(() => {
    const fetchCartItems = async () => {
      const data = await getCartProduct();
      setCartItems(data.content);
    };
    fetchCartItems();
  }, []);

  return (
    <S.Container>
      <Header />
      <CheckBox label="전체 선택" isChecked={false} onChange={() => {}} />
      <S.CartList>
        {cartItems?.map((cartItem) => (
          <Card cartItem={cartItem} key={cartItem.id} />
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
