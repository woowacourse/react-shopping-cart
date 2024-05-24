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
      {type === "edit" &&
        productList.map((item) => (
          <ProductItem key={item.product.id} item={item} type={type} />
        ))}
      {type === "readonly" &&
        productList.map((item) => (
          <ProductItem key={item.product.id} item={item} type={type} />
        ))}
    </S.ListWrapper>
  );
};

export default ProductList;
