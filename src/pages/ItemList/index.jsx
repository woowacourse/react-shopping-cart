import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import GridWrapper from "../../components/GridWrapper";
import Item from "../../components/Item";
import ItemSkeleton from "../../components/ItemSkeleton";
import { v4 as uuidv4 } from "uuid";
import throttle from "../../utils/throttle";
import useInfinityScroll from "../../hooks/useInfinityScroll";
import { LOAD_ITEM_AMOUNT } from "../../constants";
import useProductList from "../../hooks/useProductList";

const DELAY_TIME = 500;

const ItemList = () => {
  const sectionRef = useRef(null);

  const {
    isLoading,
    data: products,
    isEnd,
    getProductsByPage,
  } = useProductList();

  const navigate = useNavigate();

  const delayGetProduct = throttle(DELAY_TIME, () => getProductsByPage());

  useInfinityScroll({
    ref: sectionRef,
    cb: delayGetProduct,
    endPoint: isEnd,
  });

  const handleItemClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <section>
      <GridWrapper>
        {products.map((product) => (
          <Item
            key={product.id}
            {...product}
            onClick={() => {
              handleItemClick(product.id);
            }}
          />
        ))}
        {isLoading &&
          Array.from({ length: LOAD_ITEM_AMOUNT }).map(() => (
            <ItemSkeleton key={uuidv4()} />
          ))}
      </GridWrapper>
      <div ref={sectionRef}></div>
    </section>
  );
};

export default ItemList;
