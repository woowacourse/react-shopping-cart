import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import GridWrapper from "../../components/GridWrapper";
import Item from "../../components/Item";
import ItemSkeleton from "../../components/ItemSkeleton";
import { getProductsByPage } from "../../modules/products";
import { v4 as uuidv4 } from "uuid";
import throttle from "../../utils/throttle";
import useInfinityScroll from "../../hooks/useInfinityScroll";
import { LOAD_ITEM_AMOUNT } from "../../constants";

const DELAY_TIME = 500;

const ItemList = () => {
  const products = useSelector((state) => state.products);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sectionRef = useRef(null);

  const delayGetProduct = throttle(DELAY_TIME, () =>
    dispatch(getProductsByPage())
  );

  useInfinityScroll({
    ref: sectionRef,
    cb: delayGetProduct,
    endPoint: products.isEnd,
  });

  const handleItemClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <section>
      <GridWrapper>
        {products.data.map((product) => (
          <Item
            key={product.id}
            {...product}
            onClick={() => {
              handleItemClick(product.id);
            }}
          />
        ))}
        {products.isLoading &&
          Array.from({ length: LOAD_ITEM_AMOUNT }).map(() => (
            <ItemSkeleton key={uuidv4()} />
          ))}
      </GridWrapper>
      <div ref={sectionRef}></div>
    </section>
  );
};

export default ItemList;
