import Button from "../Button/Button";
import { CartProduct } from "../CartProduct/CartProduct";
import { CheckBox } from "../CheckBox/CheckBox";
import { Line } from "../Line/Line";
import {
  CartItemBox,
  CartItemHeader,
  CartProductContainerLayout,
  SelectAllLayout,
} from "./CartProductContainer.style";

const DUMMY = [
  {
    id: 7124,
    quantity: 2,
    product: {
      id: 25,
      name: "얌샘김밥",
      price: 5000,
      imageUrl:
        "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20171018_6%2F1508253136417Dlrjh_PNG%2FCdq22zpVpr92_XHROlHbxjJ0.png&type=sc960_832",
      category: "식료품",
    },
  },
  {
    id: 7161,
    quantity: 1,
    product: {
      id: 27,
      name: "아바라",
      price: 4800,
      imageUrl:
        "https://image.ohousecdn.com/i/bucketplace-v2-development/uploads/cards/snapshots/171653801239329270.jpeg?w=256&h=366&c=c",
      category: "식료품",
    },
  },
];

export default function CartProductContainer() {
  // const { cart, product, dispatch } = useShoppingContext();
  // const cart = { item: [], id: 1 };

  // if (cart.item.length === 0)
  //   return (
  //     <div>
  //       장바구니에 추가된 목록이 없습니다. <br /> 상품을 먼저 추가해주세요
  //     </div>
  //   );

  return (
    <>
      <div css={CartProductContainerLayout}>
        <div css={SelectAllLayout}>
          <CheckBox isChecked={false} id="select-all" />
          <label htmlFor="select-all">전체 선택</label>
        </div>
        {DUMMY.map((cartItem) => {
          return (
            <section css={CartItemBox}>
              <Line />
              <div css={CartItemHeader}>
                <CheckBox isChecked={false} />
                <Button onClick={() => {}} style="ghost">
                  삭제
                </Button>
              </div>
              <CartProduct
                key={cartItem.id}
                id={cartItem.id}
                imageUrl={cartItem.product.imageUrl}
                name={cartItem.product.name}
                price={cartItem.product.price}
                quantity={cartItem.quantity}
                onChange={() => {}}
                maxQuantity={100000}
              />
            </section>
          );
        })}
      </div>
    </>
  );
}
