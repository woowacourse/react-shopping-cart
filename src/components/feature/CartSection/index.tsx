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
  const isSetting = useRef(false);
  const [selectedCartId, setSelectedCartId] = useState<number[]>([]);
  const { cartItems, refetch } = useGetCartItem();
  const isAllChecked = selectedCartId?.length === cartItems?.length;

  const handleAllSelected = () => {
    if (isAllChecked) {
      setSelectedCartId([]);
      return;
    }
    setSelectedCartId(cartItems?.map((item) => item.id) || []);
  };

  const isChecked = (id: number) => {
    return selectedCartId?.some((item) => item === id);
  };

  const handleToggle = (id: number) => {
    // 선택이 안되어 있음 -> 선택됨
    if (!selectedCartId?.find((item) => item === id)) {
      setSelectedCartId((prev) => [...prev, id]);
      return;
    }
    // 선택이 되어 있음 -> 선택안됨
    setSelectedCartId(selectedCartId?.filter((cartId) => cartId !== id));
  };

  const handleDelete = (id: number) => {
    if (!selectedCartId?.find((item) => item === id)) return;
    setSelectedCartId(selectedCartId?.filter((cartId) => cartId !== id));
  };

  useEffect(() => {
    if (cartItems && !isSetting.current) {
      const cartIdList = cartItems?.map((item) => item.id);
      setSelectedCartId(cartIdList);
      isSetting.current = true;
    }
  }, [cartItems]);

  return (
    <S.Container>
      <Header selectedCartItemCount={selectedCartId?.length} />
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
            onDeleteSelected={() => handleDelete(cartItem.id)}
          />
        ))}
      </S.CartList>

      <PriceSection cartItems={cartItems} selectedCartId={selectedCartId} />
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
