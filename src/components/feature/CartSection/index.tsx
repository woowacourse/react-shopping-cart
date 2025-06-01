import * as S from "./CartSection.styles";
import Card from "./CartProducts/Card";
import Header from "./Header";
import CheckBox from "../../common/CheckBox";
import PriceSection from "./PriceSection";
import useGetCartItem from "../../../hooks/useGetCartItem";
import { useSelectedCart } from "../../../hooks/useSelectedCart";

const CartSection = () => {
  const { cartItems, refetch } = useGetCartItem();
  const { selectedCartId, handleAllSelected, handleToggle, handleDelete } =
    useSelectedCart(cartItems);

  const isChecked = (id: number) => {
    return selectedCartId?.some((item) => item === id);
  };
  const isAllChecked = selectedCartId?.length === cartItems?.length;

  return (
    <S.Container>
      <S.Wrapper>
        <Header />
        {cartItems?.length === 0 ? (
          <S.EmptyCartContainer data-testid="empty-page">
            장바구니에 담은 상품이 없습니다.
          </S.EmptyCartContainer>
        ) : (
          <>
            <S.Description>
              현재 {cartItems?.length}종류의 상품이 담겨있습니다.
            </S.Description>
            <CheckBox
              label="전체 선택"
              isChecked={isAllChecked}
              onChange={handleAllSelected}
              testId="all-selected"
            />
            <S.CartList data-testid="cart-list">
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
              cartItems={cartItems}
              selectedCartId={selectedCartId}
            />
          </>
        )}
      </S.Wrapper>
    </S.Container>
  );
};

export default CartSection;
