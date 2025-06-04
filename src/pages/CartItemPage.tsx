import { css } from "@emotion/css";
import ConfirmButton from "../components/@common/Button/ConfirmButton/ConfirmButton";
import CartItemCardList from "../components/CartItemList/CartItemList";
import Text from "../components/@common/Text/Text";
import OrbitSpinner from "../components/@common/OrbitSpinner/OrbitSpinner";
import { useCartItemContext } from "../contexts/useCartItemContext";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { PriceSummary } from "../components/PriceSummary/PriceSummary";
import PageTitle from "../components/PageTitle/PageTitle";

const CartItemPage = () => {
  const {
    cartItems,
    selectedItemIds,
    loadingStatus,
    orderPrice,
    totalPrice,
    shippingFee,
    fetchCartItems,
    handleLoadingStatus,
  } = useCartItemContext();
  const navigate = useNavigate();

  useEffect(() => {
    handleLoadingStatus("loading");
    const fetchData = async () => {
      await fetchCartItems();
    };
    fetchData();
  }, []);

  if (loadingStatus === "loading" || cartItems === undefined) {
    return (
      <div className={OrbitSpinnerWrapper}>
        <OrbitSpinner />
      </div>
    );
  }

  if (loadingStatus === "success" && cartItems.length === 0) {
    return (
      <div className={CartItemPageStyles}>
        <PageTitle title="장바구니" />
        <Text text="장바구니에 담은 상품이 없습니다." />
      </div>
    );
  }

  return (
    <>
      <div className={CartItemPageStyles}>
        <PageTitle
          title="장바구니"
          titleCaption={
            <Text text={`현재 ${cartItems.length}개의 상품이 담겨있습니다.`} />
          }
        />
        <CartItemCardList cartItems={cartItems} />
        <PriceSummary
          orderPrice={orderPrice}
          shippingFee={shippingFee}
          totalPrice={totalPrice}
        />
      </div>

      {cartItems.length > 0 && (
        <ConfirmButton
          text="주문하기"
          disabled={selectedItemIds.size === 0}
          onClick={() => {
            navigate("/order-confirm");
          }}
        />
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

const OrbitSpinnerWrapper = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
