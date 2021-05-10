import React, { useEffect, VFC } from "react";
import { useDispatch, useSelector } from "react-redux";

import actions from "../../actions";
import { Product, ProductImage } from "../../Components";
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

  return (
    <Container>
      {Object.entries(products).map(([id, { imageSrc, name, price }]) => (
        <Product
          key={id}
          id={id}
          Image={<ProductImage size="282px" src={imageSrc} />}
          name={name}
          price={price}
          onClickCart={() => {}}
        />
      ))}
    </Container>
  );
};

export default ProductList;
