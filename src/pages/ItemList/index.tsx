import { useRef } from "react";
import GridWrapper from "../../components/GridWrapper";
import ItemSkeleton from "../../components/ItemSkeleton";
import { v4 as uuidv4 } from "uuid";
import throttle from "../../utils/throttle";
import useInfinityScroll from "../../hooks/useInfinityScroll";
import { LOAD_ITEM_AMOUNT } from "../../constants";
import useProductList from "../../hooks/useProductList";
import ProductList from "../../components/ProductList";

const DELAY_TIME = 500;

const ItemList = () => {
  const sectionRef = useRef(null);
  const {
    isLoading,
    data: products,
    isEnd,
    getProductsByPage,
  } = useProductList();

  const delayGetProduct = throttle(DELAY_TIME, () => getProductsByPage());

  useInfinityScroll({
    ref: sectionRef,
    cb: delayGetProduct,
    endPoint: isEnd,
  });

  return (
    <section>
      <GridWrapper>
        {ProductList(products)}
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
