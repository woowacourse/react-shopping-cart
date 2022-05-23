import React, { useEffect, useState } from "react";
import Header from "@shared/header/Header";
import styles from "@/app.module";
import Home from "@home/Home";
import Cart from "@cart/Cart";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import createAction from "@redux/createAction";
import { useDispatch, useSelector } from "react-redux";
import ACTION_TYPE from "@redux/actions";
import Alert from "@shared/alert/Alert";

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const productList = useSelector(({ productList }) => productList);
  const dispatch = useDispatch();
  const getProductList = () => {
    return async (dispatch) => {
      // eslint-disable-next-line no-undef
      const fetchResult = await fetch(`${API_URL}/products`);
      const productList = await fetchResult.json();
      setLoading(false);
      setError(null);
      dispatch(createAction(ACTION_TYPE.UPDATE_PRODUCT_LIST, productList));
    };
  };
  useEffect(() => {
    dispatch(getProductList());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;
  if (productList.length === 0)
    return <Alert variant="danger">상품이 비어있습니다</Alert>;

  return (
    <div>
      <BrowserRouter>
        <Header className={styles.header} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
