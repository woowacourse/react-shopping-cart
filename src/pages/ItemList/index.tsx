import { useRef } from "react";
import GridWrapper from "../../components/@shared/GridWrapper";
import ItemSkeleton from "../../components/Product/ItemSkeleton";
import { v4 as uuidv4 } from "uuid";
import throttle from "../../utils/throttle";
import useInfinityScroll from "../../hooks/useInfinityScroll";
import { LOAD_ITEM_AMOUNT } from "../../constants";
import useProductList from "../../hooks/useProductList";

import { useNavigate } from "react-router-dom";
import { ProductType } from "../../types/product";
import Item from "../../components/Product/Item";
import useCartList from "../../hooks/useCartList";

const DELAY_TIME = 500;

const ProductList: Function = (
  products: ProductType[]
): React.ReactElement[] => {
  const navigate = useNavigate();
  const { createNewCart } = useCartList();

  const handleItemClick = (id: number) => {
    navigate(`/product/${id}`);
  };
  return products.map((product: ProductType) => {
    const { id } = product;
    const itemCardElemProps = {
      key: product.id,
      onClick: () => {
        handleItemClick(product.id);
      },
      onClickShoppingCart: () => {
        createNewCart(id, product.price);
      },
      ...product,
    };

    return <Item {...itemCardElemProps} />;
  });
};

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
