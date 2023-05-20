import styled from "styled-components";
import Item from "components/Item";
import { useFetch } from "hooks/useFetch";
import { useRecoilState, useRecoilValue } from "recoil";
import { productListState } from "recoil/atom";
import { Product, CartProduct } from "types/domain";
import { useEffect } from "react";
import { CartProductList } from "recoil/selector";

const ItemList = () => {
  const [productList, setProductList] = useRecoilState(productListState);
  const cartList = useRecoilValue(CartProductList);

  const { result, isLoading } = useFetch<Product[]>("/products");

  useEffect(() => {
    if (isLoading || !result) return;

    setProductList(
      result.map((product) => {
        const cartItem = cartList.find((item) => item.id === product.id);

        const updatedProduct: CartProduct = {
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
