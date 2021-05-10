import React, { useEffect, VFC, MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";

import actions from "../../actions";
import { Product, ProductImage } from "../../Components";
import { CartItem } from "../../interface";
import { RootState } from "../../store";

import { Container } from "./styles";

const ProductList: VFC = () => {
  const dispatch = useDispatch();

  const { products, requestErrorMessage } = useSelector(
    ({ products: { products, requestErrorMessage } }: RootState) => ({
      products,
      requestErrorMessage,
    })
  );

  useEffect(() => {
    dispatch(actions.products.get.request());
  }, []);

  const onClickCart = ({ currentTarget }: MouseEvent<HTMLButtonElement>) => {
    if (currentTarget.dataset.productId === undefined) {
      return;
    }

    const id = currentTarget.dataset.productId;

    const cartItem: CartItem = {
      id,
      quantity: 1,
      isSelected: true,
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
          onClickCart={onClickCart}
        />
      ))}
    </Container>
  );
};

export default ProductList;
