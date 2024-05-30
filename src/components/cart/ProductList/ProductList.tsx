import * as S from "./ProductList.style.ts";

import ProductItem, { CartItemShowType } from "../ProductItem/ProductItem.tsx";
import { CartItem } from "@/types/cart.ts";

const ProductList = ({
  type = "edit",
  productList,
}: {
  type?: CartItemShowType;
  productList: CartItem[];
}) => {
  return (
    <S.ListWrapper>
      {productList.map((item) => (
        <ProductItem key={item.id} item={item} type={type} />
      ))}
    </S.ListWrapper>
  );
};

export default ProductList;
