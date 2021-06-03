import React, { useEffect, VFC } from "react";
import { useDispatch, useSelector } from "react-redux";

import actions from "../../actions";
import { RootState } from "../../store";

import { CartAnimation, Product } from "../../Components";
import { Loading } from "../../Components/@shared";
import { Container, Inner } from "./styles";

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

  const onClickCart = (productId: string) => {
    dispatch(actions.cart.post.request(productId));
  };

  if (loading) {
    return (
      <Container>
        <Loading />
      </Container>
    );
  }

  if (requestErrorMessage) {
    return (
      <Container>
        <p>requestErrorMessage</p>
      </Container>
    );
  }

  return (
    <Container>
      <Inner>
        {products.map(({ productId, imageUrl, name, price }) => (
          <Product
            key={productId}
            id={productId}
            imageUrl={imageUrl}
            imageSize="282px"
            name={name}
            price={price}
            onClickCart={() => {
              onClickCart(productId);
            }}
          />
        ))}
      </Inner>
      {animation.isShow && <CartAnimation />}
    </Container>
  );
};

export default ProductList;
