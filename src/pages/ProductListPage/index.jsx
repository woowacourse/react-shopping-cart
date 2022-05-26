import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsByPage } from "../../modules/products";
import { DELAY_TIME } from "../../constants/constants";
import throttle from "../../utils/throttle";
import useInfinityScroll from "../../hooks/useInfinityScroll";
import GridWrapper from "../../components/GridWrapper";
import Products from "../../components/Products";
import { useNavigate } from "react-router-dom";

const ProductListPage = () => {
  const sectionRef = useRef(null);
  const navigate = useNavigate();
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const delayGetProduct = throttle(DELAY_TIME, () =>
    dispatch(getProductsByPage())
  );

  useInfinityScroll(sectionRef, delayGetProduct, products.isEnd);

  if (products.error) navigate("/server-error");

  return (
    <section>
      <GridWrapper>
        <Products products={products} />
      </GridWrapper>
      <div ref={sectionRef}></div>
    </section>
  );
};

export default ProductListPage;
