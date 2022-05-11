import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";

import ProductListPage from "./ProductListPage";
import ProductDetailPage from "./ProductDetailPage";
import ProductCartPage from "./ShoppingCartPage";
import Spinner from "../common/Spinner";
import OrderListPage from "./OrderListPage";

const Container = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;

  max-width: 1320px;
  margin: 140px auto 60px;

  height: calc(100vh - 200px);
`;

function Main() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("https://react-shoppingcart-server.herokuapp.com/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`fetch error`);
        }
        return response.json();
      })
      .then((data) => {
        if (!data) {
          throw new Error(`No Data`);
        }
        dispatch({
          type: "INIT",
          payload: { products: data },
        });
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        return {};
      });
  }, [dispatch]);

  return (
    <Container>
      {isLoading ? (
        <Spinner />
      ) : (
        <Routes>
          <Route exact path="/" element={<ProductListPage />} />
          <Route exact path="/product-list" element={<ProductListPage />} />
          <Route
            exact
            path="/product-detail/:id"
            element={<ProductDetailPage />}
          />
          <Route exact path="/product-cart" element={<ProductCartPage />} />
          <Route exact path="/order-list" element={<OrderListPage />} />
          <Route path="*" element={<div>잘못된 접근입니다.</div>} />
        </Routes>
      )}
    </Container>
  );
}

export default Main;
