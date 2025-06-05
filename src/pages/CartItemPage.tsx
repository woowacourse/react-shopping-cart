import { css } from "@emotion/css";
import ConfirmButton from "../components/@common/Button/ConfirmButton/ConfirmButton";
import CartItemCardList from "../components/CartItemList/CartItemList";
import CartPageTitle from "../components/CartPageTitle/CartPageTitle";
import PriceRow from "../components/PriceRow/PriceRow";
import Text from "../components/@common/Text/Text";
import OrbitSpinner from "../components/@common/OrbitSpinner/OrbitSpinner";
import { useCartItemContext } from "../contexts/useCartItemContext";
import { FREE_SHIPPING_MIN_AMOUNT } from "../constants";
import { useNavigate } from "react-router";
import { useCartSummary } from "../hooks/useCartSummary";

const CartItemPage = () => {
  const { cartItems, selectedItem, isLoading } = useCartItemContext();
  const { orderPrice, totalPrice, shippingFee } = useCartSummary();
  const navigate = useNavigate();

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
                <CartItemCardList />

                <div className={InfoRow}>
                  <img src="./info-icon.svg" alt="info" />
                  <Text
                    text={`총 주문 금액이 ${FREE_SHIPPING_MIN_AMOUNT.toLocaleString()}원 이상일 경우 무료 배송됩니다.`}
                  />
                </div>

                <hr className={Divider} />
                <PriceRow
                  title="주문 금액"
                  price={orderPrice}
                  testId="order-price"
                />
                <PriceRow
                  title="배송비"
                  price={shippingFee}
                  testId="shipping-fee"
                />
                <hr className={Divider} />
                <PriceRow title="총 결제 금액" price={totalPrice} />
              </>
            )}
          </div>

          {cartItems.length > 0 && (
            <ConfirmButton
              text="주문하기"
              disabled={selectedItem.size === 0}
              onClick={() => {
                navigate("/order-confirm", {
                  state: {
                    selectedItemCount: selectedItem.size,
                    totalPrice,
                    selectedItemIds: Array.from(selectedItem),
                  },
                });
              }}
            />
          )}
        </>
      )}
    </>
  );
};

export default CartItemPage;

const CartItemPageStyles = css`
  padding: 24px;
  min-height: calc(100vh - 64px);
  justify-content: center;
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
