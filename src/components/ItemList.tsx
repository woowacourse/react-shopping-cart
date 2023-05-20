import styled from "styled-components";
import Item from "components/Item";
import { useGet } from "hooks/useGet";
import { useRecoilState, useRecoilValue } from "recoil";
import { productListState } from "recoil/atom";
import { ProductType } from "types/domain";
import { useEffect } from "react";
import { CartProductList } from "recoil/selector";

const ItemList = () => {
  const [productList, setProductList] = useRecoilState(productListState);
  const cartList = useRecoilValue(CartProductList);

  const { result, isLoading } = useGet({ fetchUrl: "/products" });

  useEffect(() => {
    if (isLoading) return;

    setProductList(
      result.map((product) => {
        const cartItem = cartList.find((item) => item.id === product.id);

        const updatedProduct: ProductType = {
          ...product,
          quantity: cartItem ? cartItem.quantity : 0,
          isChecked: true,
        };

        return updatedProduct;
      })
    );
  }, [isLoading]);

  return (
    <Wrapper>
      {!isLoading && productList.map((item) => <Item key={crypto.randomUUID()} {...item} />)}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  place-items: center;
  grid-template-columns: repeat(4, 1fr);

  width: 100%;
  grid-gap: 60px 20px;

  @media screen and (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (max-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export default ItemList;
