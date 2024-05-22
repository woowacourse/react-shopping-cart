import * as S from "./ProductList.style.ts";
import { useRecoilValue } from "recoil";

import ProductItem, { CartItemShowType } from "../ProductItem/ProductItem.tsx";
import { cartItems } from "@/recoil/cartItems.ts";
import { selectedCartItemsIdState } from "@/recoil/selectedCardItems.ts";

const ProductList = ({ type = "edit" }: { type?: CartItemShowType }) => {
  const cartItemList = useRecoilValue(cartItems);
  const selectedItemsId = useRecoilValue(selectedCartItemsIdState);

  const selectedItems = cartItemList.filter((item) =>
    selectedItemsId.includes(item.id)
  );

  return (
    <S.ListWrapper>
      {type === "edit" &&
        cartItemList.map((item) => (
          <ProductItem key={item.product.id} item={item} type={type} />
        ))}
      {type === "readonly" &&
        selectedItems.map((item) => (
          <ProductItem key={item.product.id} item={item} type={type} />
        ))}
    </S.ListWrapper>
  );
};

export default ProductList;
