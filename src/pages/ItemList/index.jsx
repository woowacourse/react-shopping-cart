import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import GridWrapper from "../../components/GridWrapper";
import Items from "../../components/Items";
import { getProductsByPage } from "../../modules/products";
import throttle from "../../utils/throttle";
import useInfinityScroll from "../../hooks/useInfinityScroll";

const DELAY_TIME = 500;

const ItemList = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const sectionRef = useRef(null);
  const delayGetProduct = throttle(DELAY_TIME, () =>
    dispatch(getProductsByPage())
  );

  useInfinityScroll(sectionRef, delayGetProduct, products.isEnd);

  return (
    <section>
      <GridWrapper>
        <Items />
      </GridWrapper>
      <div ref={sectionRef}></div>
    </section>
  );
};

export default ItemList;
