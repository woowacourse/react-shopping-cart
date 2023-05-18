import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { fetchCartItems, fetchProducts } from "../api";
import { Header, Loading, Page, ProductList } from "../components";
import { MIN_QUANTITY } from "../constants";
import { productsState } from "../recoil/atom";
import { CartItemType, PayloadType } from "../types/domain";

const Main = () => {
  const setProducts = useSetRecoilState(productsState);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setProductsWithQuantity();
  }, []);

  const setProductsWithQuantity = async () => {
    try {
      const products = await fetchProducts();
      const cartItems = await fetchCartItems();

      const productsWithQuantity = products.map((product: PayloadType) => {
        const cartProduct = cartItems.find(
          (cartItem: CartItemType) => cartItem.id === product.id
        );
        return {
          ...product,
          quantity: cartProduct
            ? cartProduct.quantity
            : MIN_QUANTITY.toString(),
        };
      });
      setProducts(productsWithQuantity);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <Page>
        {isLoading ? (
          <Loading message="상품 목록 불러오는 중..." />
        ) : (
          <ProductList />
        )}
      </Page>
    </>
  );
};

export default Main;
