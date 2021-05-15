import React, { useEffect, VFC } from "react";
import { useDispatch, useSelector } from "react-redux";

import actions from "../../actions";
import { Animation, Product, ProductImage } from "../../Components";
import { CartItem } from "../../types";
import { RootState } from "../../store";

import { Container } from "./styles";

const ProductList: VFC = () => {
  const dispatch = useDispatch();

  const { products, loading, requestErrorMessage } = useSelector(
    ({ products: { products, loading, requestErrorMessage } }: RootState) => ({
      products,
      loading,
      requestErrorMessage,
    })
  );

  const { animation } = useSelector(({ cart: { animation } }: RootState) => ({ animation }));

  useEffect(() => {
    dispatch(actions.products.get.request());
  }, []);

  const onClickCart = (id: string) => {
    const cartItem: CartItem = {
      id,
      name: products[id].name,
      price: products[id].price,
      imageSrc: products[id].imageSrc,
      quantity: 1,
    };

    dispatch(actions.cart.post.request(cartItem));
  };

  return (
    <Container>
      {Object.entries(products).map(([id, { imageSrc, name, price }]) => (
        <Product
          key={id}
          id={id}
          Image={<ProductImage size="282px" src={imageSrc} />}
          name={name}
          price={price}
          onClickCart={() => {
            onClickCart(id);
          }}
        />
      ))}
      {animation.isShow && <Animation.Cart />}
    </Container>
  );
};

export default ProductList;
