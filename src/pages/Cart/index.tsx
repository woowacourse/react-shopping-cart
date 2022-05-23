import CartItem from "../../components/CartItem";
import CartOrderContainer from "../../components/CartOrder";
import Checkbox from "../../components/Checkbox";
import useCart from "../../hooks/useCart";
import * as S from "./index.styles";

const Cart = () => {
  const { cartData, isAllChecked, changeAllCartChecked } = useCart();

  const handleAllCheckedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeAllCartChecked(e.target.checked);
  };

  return (
    <>
      <S.Title>장바구니</S.Title>

      <S.DeleteButtonContainer>
        <Checkbox
          id={100000}
          label={isAllChecked ? "선택해제" : "전체선택"}
          value={isAllChecked}
          handleChange={handleAllCheckedChange}
        />
        <S.DeleteButton>상품 삭제</S.DeleteButton>
      </S.DeleteButtonContainer>
      <S.ItemOrderContainer>
        <S.ItemListContainer>
          <S.CartTitle>{`LokBa PhotoCard (${cartData.length})`}</S.CartTitle>
          {cartData.map((cart) => (
            <CartItem key={cart.id} id={cart.productId} cartId={cart.id} />
          ))}
        </S.ItemListContainer>
        <S.OrderContainer>
          <CartOrderContainer />
        </S.OrderContainer>
      </S.ItemOrderContainer>
    </>
  );
};

export default Cart;
