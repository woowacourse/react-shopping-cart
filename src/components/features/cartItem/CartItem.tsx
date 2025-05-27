import * as S from "./CartItem.styles";

interface CartItem {
  id: string;
  product: {
    imageUrl: string;
    name: string;
    price: number;
  };
  quantity: number;
}

const CartItem = ({ cartData }: { cartData: CartItem }) => {
  return (
    <>
      <div css={S.cartItemWrapper}>
        <div css={S.cartItemController}>
          <div>체크박스 위치</div>
          <button onClick={() => {}}>삭제</button>
        </div>
        <div key={cartData.id} css={S.cartItemStyle}>
          <img src={cartData.product.imageUrl} alt={cartData.product.name} />
          <div css={S.cartInfoStyle}>
            <h3 css={S.cartItemNameStyle}>{cartData.product.name}</h3>
            <p css={S.cartItemPriceStyle}>
              {cartData.product.price.toLocaleString()}원
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItem;
