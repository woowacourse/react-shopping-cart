import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsByPage } from "../../modules/products";
import { DELAY_TIME } from "../../constants/constants";
import throttle from "../../utils/throttle";
import useInfinityScroll from "../../hooks/useInfinityScroll";
import GridWrapper from "../../components/GridWrapper";
import Products from "../../components/Products";
import AxiosErrorPage from "../AxiosErrorPage";

const ProductListPage = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const sectionRef = useRef(null);
  const delayGetProduct = throttle(DELAY_TIME, () =>
    dispatch(getProductsByPage())
  );

  useInfinityScroll(sectionRef, delayGetProduct, products.isEnd);

  useEffect(() => {
    dispatch(getProductsByPage());
  }, [dispatch]);

  if (products.error) return <AxiosErrorPage />;

  return (
    <section>
      <GridWrapper>
        <Products />
      </GridWrapper>
      <div ref={sectionRef}></div>
    </section>
  );
};

export default ProductListPage;
