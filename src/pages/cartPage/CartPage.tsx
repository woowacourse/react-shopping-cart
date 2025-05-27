import * as S from "./CartPage.style";
import { Title, Subtitle } from "../../styles/@common/title/Title.styles";
import CartItem from "../../components/features/cartItem/CartItem";
import CartPrice from "../../components/features/cartPrice/CartPrice";
import { getCart } from "../../services/cartService";
import { useEffect, useState } from "react";

const CartPage = () => {
  const [cartData, setCartData] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchCartData = async () => {
      const cartData = await getCart();
      setCartData(cartData);
    };

    fetchCartData();
  }, []);

  return (
    <div css={S.CartPageWrapper}>
      <div css={S.CartTitleContainer}>
        <p css={Title}>장바구니</p>
        <p css={Subtitle}>현재 2종류의 상품이 담겨있습니다.</p>
      </div>
      {cartData.map((item) => (
        <CartItem key={item.id} cartData={item} />
      ))}
      <CartPrice />
    </div>
  );
};

export default CartPage;
