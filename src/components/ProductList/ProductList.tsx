import { useRecoilValue } from "recoil";
import { cartItems } from "@/recoil/cartItems";

import ProductItem from "../ProductItem/ProductItem";

import Styled from "./ProductList.style";

const ProductList = () => {
  const cartItemList = useRecoilValue(cartItems);

  return (
    <Styled.ListWrapper>
      {cartItemList &&
        cartItemList.map((item) => (
          <ProductItem key={item.product.id} item={item} />
        ))}
    </Styled.ListWrapper>
  );
};

export default ProductList;
