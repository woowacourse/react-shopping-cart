import * as S from "./CartSection.styles";
import Card from "./CartProducts/Card";
import Header from "./Header";
import CheckBox from "../../common/CheckBox";
import PriceSection from "./PriceSection";
import Button from "../../common/Button";
import { css } from "@emotion/react";
import useGetCartItem from "../../../hooks/useGetCartItem";
import { useState, useEffect, useRef } from "react";

const CartSection = () => {
  const { cartItems, refetch } = useGetCartItem();
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const isAllChecked = selectedProducts?.length === cartItems?.length;
  const isSetting = useRef(false);

  const handleAllSelected = () => {
    if (isAllChecked) {
      setSelectedProducts([]);
      return;
    }
    setSelectedProducts(cartItems?.map((item) => item.id) || []);
  };

  const isChecked = (id: number) => {
    return selectedProducts?.some((item) => item === id);
  };

  const handleToggle = (id: number) => {
    if (!selectedProducts?.find((item) => item === id)) {
      setSelectedProducts((prev) => [...prev, id]);
      return;
    }

    setSelectedProducts(selectedProducts?.filter((cartId) => cartId !== id));
  };

  useEffect(() => {
    if (cartItems && !isSetting.current) {
      const cartIdList = cartItems?.map((item) => item.id);
      setSelectedProducts(cartIdList);
      isSetting.current = true;
    }
  }, [cartItems, selectedProducts]);

  return (
    <S.Container>
      <Header />
      <CheckBox
        label="전체 선택"
        isChecked={isAllChecked}
        onChange={handleAllSelected}
      />
      <S.CartList>
        {cartItems?.map((cartItem) => (
          <Card
            cartItem={cartItem}
            key={cartItem.id}
            onRefetch={refetch}
            isChecked={isChecked(cartItem.id)}
            onToggle={() => handleToggle(cartItem.id)}
          />
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
