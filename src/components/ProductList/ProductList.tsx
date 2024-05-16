import styled from "styled-components";

import { useRecoilValue } from "recoil";

import ProductItem from "../ProductItem/ProductItem";
import { cartItems } from "@/recoil/cartItems";

const ProductList = () => {
  const cartItemList = useRecoilValue(cartItems);

  return (
    <S.ListWrapper>
      {cartItemList.map((item) => (
        <ProductItem key={item.product.id} item={item} />
      ))}
    </S.ListWrapper>
  );
};

export default ProductList;

const ListWrapper = styled.div`
  margin-bottom: 52px;
`;

const S = {
  ListWrapper,
};
