import * as S from "./CartSection.styles";
import Card from "./CartProducts/Card";
import Header from "./Header";
import CheckBox from "../../common/CheckBox";
import PriceSection from "./PriceSection";
import useGetCartItem from "../../../hooks/useGetCartItem";
import { CartProduct } from "../../../type/cart";
import Button from "../../common/Button";
import { useNavigate } from "react-router";
import { css } from "@emotion/react";
import { useSelectedCart } from "../../../hooks/useSelectedCart";

const CartSection = () => {
  const navigate = useNavigate();
  const { cartItems, refetch } = useGetCartItem();
  const { selectedCartId, handleAllSelected, handleToggle, handleDelete } =
    useSelectedCart(cartItems);

  const isChecked = (id: number) => {
    return selectedCartId?.some((item) => item === id);
  };

  const isAllChecked = selectedCartId?.length === cartItems?.length;
  const selectedItem = cartItems?.filter(
    (item: CartProduct) => selectedCartId.indexOf(item.id) > -1
  );

  const getOrderPrice = () => {
    return (
      selectedItem?.reduce(
        (total: number, current: CartProduct) =>
          current.product.price * current.quantity + total,
        0
      ) ?? 0
    );
  };

  const totalAmount = selectedItem?.reduce(
    (total: number, current: CartProduct) => total + current.quantity,
    0
  );
  const orderPrice = getOrderPrice();
  const deliveryPrice = orderPrice >= 100_000 ? 0 : 3000;
  const totalPrice = orderPrice + deliveryPrice;

  return (
    <S.Container>
      <S.Wrapper>
        <Header />
        {cartItems?.length === 0 ? (
          <S.EmptyCartContainer>
            장바구니에 담은 상품이 없습니다.
          </S.EmptyCartContainer>
        ) : (
          <>
            <S.Description>
              현재 {selectedCartId.length}종류의 상품이 담겨있습니다.
            </S.Description>
            <CheckBox
              label="전체 선택"
              isChecked={isAllChecked}
              onChange={handleAllSelected}
            />
            <S.CartList>
              {cartItems?.map((cartItem) => (
                <Card
                  key={cartItem.id}
                  cartItem={cartItem}
                  onRefetch={refetch}
                  isChecked={isChecked(cartItem.id)}
                  onToggle={() => handleToggle(cartItem.id)}
                  onDeleteSelected={() => handleDelete(cartItem.id)}
                />
              ))}
            </S.CartList>

            <PriceSection
              orderPrice={orderPrice}
              deliveryPrice={deliveryPrice}
              totalPrice={totalPrice}
            />
          </>
        )}
      </S.Wrapper>
      <Button
        title="주문 확인"
        disabled={cartItems?.length === 0}
        onClick={() =>
          navigate("/confirm", {
            state: {
              sort: selectedCartId.length,
              totalAmount: totalAmount,
              totalPrice: totalPrice,
            },
          })
        }
        css={css`
          width: 100%;
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
