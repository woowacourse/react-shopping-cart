import { useRecoilState } from "recoil";
import styled from "styled-components";
import { cartListState } from "../../atoms";
import { CartCard } from "../productCard/CartCard";
import { useState } from "react";
import { deleteCartItem } from "../../utils/apis";
import { TotalPrice } from "../TotalPrice";
import { CheckIcon } from "../../assets/ShoppingCartIcons";

export const CartCardList = () => {
  const [cartList, setCartList] = useRecoilState(cartListState);
  const [selectedItemIds, setSelectedItemIds] = useState<number[]>(cartList.map((item) => item.id));

  const isSelected = (id: number) => {
    return selectedItemIds.includes(id);
  };

  const isAllSelected = () => {
    return cartList.length === selectedItemIds.length;
  };

  const toggleSelectedItem = (id: number) => {
    if (selectedItemIds.includes(id)) {
      setSelectedItemIds((current) => current.filter((item) => item !== id));
      return;
    }

    setSelectedItemIds((current) => [...current, id]);
  };

  const toggleAllItem = () => {
    if (isAllSelected()) {
      setSelectedItemIds([]);
      return;
    }

    setSelectedItemIds(cartList.map((item) => item.id));
  };

  const deleteSelectedItems = () => {
    if (selectedItemIds.length === 0 || !window.confirm("선택한 목록을 장바구니에서 정말 삭제할까요?")) return;
    selectedItemIds.forEach((id) => deleteCartItem(id));
    setCartList((current) => current.filter((item) => !selectedItemIds.includes(item.id)));
    setSelectedItemIds([]);
  };

  const totalPrice = cartList
    .filter((item) => selectedItemIds.includes(item.id))
    .reduce((pre, curr) => {
      return pre + curr.product.price * curr.quantity;
    }, 0);

  if (cartList.length === 0) return <></>;

  return (
    <Style.Container>
      <Style.ListContainer>
        <Style.CartAmount>{`든든배송상품 (${cartList.length}개)`}</Style.CartAmount>
        <CheckIcon />
        <Style.List>
          {cartList.map((item) => (
            <CartCard
              key={item.id}
              product={item.product}
              toggleSelectedItem={toggleSelectedItem}
              isSelected={isSelected}
            />
          ))}
        </Style.List>
        <Style.Select>
          <Style.CheckBox type="checkbox" onChange={toggleAllItem} checked={isAllSelected()} />
          <div>{`전체선택 (${selectedItemIds.length}/${cartList.length})`}</div>
          <Style.DeleteButton onClick={deleteSelectedItems}>선택삭제</Style.DeleteButton>
        </Style.Select>
      </Style.ListContainer>
      <TotalPrice price={totalPrice} />
    </Style.Container>
  );
};

const Style = {
  Container: styled.div`
    display: flex;
  `,
  ListContainer: styled.div`
    width: 740px;
  `,

  List: styled.ul`
    width: 765px;

    li {
      &:last-child {
        border-bottom: none;
      }
    }
  `,

  CartAmount: styled.div`
    text-align: left;
    padding: 30px 0 20px 0;

    font-size: 24px;
    border-bottom: 4px solid #aaaaaa;
  `,

  CheckBox: styled.input`
    width: 28px;
    height: 28px;

    cursor: pointer;
    appearance: auto;
    background-repeat: no-repeat;
  `,

  Select: styled.div`
    display: flex;
    align-items: center;
    gap: 10px;

    font-size: 20px;
  `,

  DeleteButton: styled.div`
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;

    width: 98px;
    height: 35px;
    margin-left: 20px;

    font-size: 17px;
    border: 1px solid #dddddd;
    border-radius: 3px;

    cursor: pointer;
  `,
};
