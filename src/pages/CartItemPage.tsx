import { css } from "@emotion/css";
import { useEffect, useState } from "react";
import ConfirmButton from "../components/@common/Button/ConfirmButton/ConfirmButton";
import CartItemCardList from "../components/CartItemList/CartItemList";
import CartPageTitle from "../components/CartPageTitle/CartPageTitle";
import PriceRow from "../components/PriceRow/PriceRow";
import Text from "../components/@common/Text/Text";
import OrbitSpinner from "../components/@common/OrbitSpinner/OrbitSpinner";
import cartItemsApi from "../apis/cartItems";
import { CartItem } from "../types/type";

const CartItemPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCartItems = async () => {
      const response = await cartItemsApi.get();
      response.forEach((cartItem) => {
        cartItem.isSelected = true;
      });
      setCartItems(response);
      setIsLoading(false);
    };

    fetchCartItems();
  }, []);

  return (
    <>
      {isLoading || cartItems === undefined ? (
        <div className={OrbitSpinnerWrapper}>
          <OrbitSpinner />
        </div>
      ) : (
        <>
          <div className={CartItemPageStyles}>
            <CartPageTitle cartItemsTypeCount={cartItems.length} />
            {cartItems.length === 0 ? (
              <Text text="장바구니에 담은 상품이 없습니다." />
            ) : (
              <>
                <CartItemCardList isAllSelected={true} cartItems={cartItems} />

                <div className={InfoRow}>
                  <img src="./info-icon.svg" alt="info" />
                  <Text text="총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다." />
                </div>

                <hr className={Divider} />
                <PriceRow title="주문 금액" price={70000} />
                <PriceRow title="배송비" price={3000} />
                <hr className={Divider} />
                <PriceRow title="총 결제 금액" price={73000} />
              </>
            )}
          </div>

          <ConfirmButton text="주문하기" onClick={() => {}} />
        </>
      )}
    </>
  );
};

export default CartItemPage;

const CartItemPageStyles = css`
  padding: 24px;
  position: relative;
`;

const Divider = css`
  border: 0.5px solid #e0e0e0;
`;

const InfoRow = css`
  display: flex;
  align-items: center;
  gap: 4px;
  margin: 13px 0;
`;

const OrbitSpinnerWrapper = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
