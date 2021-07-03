import React, { useEffect, MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";

import actions from "../../actions";
import { Product, ProductImage } from "../../Components";
import { ProductsObject } from "../../interface";
import { RootState } from "../../store";

import { Container } from "./styles";

const ProductList = () => {
  const dispatch = useDispatch();
  const products: ProductsObject = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(actions.products.get.request());
  }, []);

  return (
    <Container>
      {Object.entries(products).map(([id, { imageSrc, name, price }]) => (
        <Product
          key={id}
          id={Number(id)}
          Image={<ProductImage size="282px" src={imageSrc} />}
          name={name}
          price={price}
          onClickCart={() => dispatch(actions.cart.post.request(Number(id)))}
        />
      ))}
    </Container>
  );
};

export default ProductList;
