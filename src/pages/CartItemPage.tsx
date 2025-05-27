import { css } from "@emotion/css";
import ConfirmButton from "../components/@common/Button/ConfirmButton/ConfirmButton";
import CartItemCardList from "../components/CartItemList/CartItemList";
import CartPageTitle from "../components/CartPageTitle/CartPageTitle";
import PriceRow from "../components/PriceRow/PriceRow";
import { CartItem } from "../types/type";
import Text from "../components/@common/Text/Text";

const mockCartItems: CartItem[] = [
  {
    id: "1",
    imgUrl: "https://example.com/image1.jpg",
    name: "콜라 500ml",
    price: 1500,
    quantity: 2,
    isSelected: true,
  },
  {
    id: "2",
    imgUrl: "https://example.com/image2.jpg",
    name: "포카칩 오리지널",
    price: 2000,
    quantity: 1,
    isSelected: false,
  },
  {
    id: "3",
    imgUrl: "https://example.com/image3.jpg",
    name: "초코파이 12개입",
    price: 4800,
    quantity: 3,
    isSelected: true,
  },
];

const CartItemPage = () => {
  return (
    <>
      <div className={CartItemPageStyles}>
        <CartPageTitle cartItemsTypeCount={2} />
        <CartItemCardList isAllSelected={true} cartItems={mockCartItems} />
        <div className={InfoRow}>
          <img src="./info-icon.svg" alt="info" />
          <Text text="총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다." />
        </div>
        <hr className={Divider} />
        <PriceRow title="주문 금액" price={70000} />
        <PriceRow title="배송비" price={3000} />
        <hr className={Divider} />
        <PriceRow title="총 결제 금액" price={73000} />
      </div>
      <ConfirmButton text="주문하기" onClick={() => {}} />
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
