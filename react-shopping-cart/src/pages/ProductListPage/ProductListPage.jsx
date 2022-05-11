import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../../component/ProductCard/ProductCard";
import {
  selectCurrentProducts,
  selectProductsError,
  selectProductsLoading,
} from "../../redux/products/products.selector";
import { useEffect } from "react";
import { fetchProductsStart } from "../../redux/products/products.action";
import WithSpinner from "../../component/@shared/WithSpinner/WithSpinner";
import { fetchCartsStart } from "../../redux/carts/carts.action";
import { selectCurrentCarts } from "../../redux/carts/carts.selector";
import { isInCart } from "../../util/check";
import CartLeftSection from "../../component/CartLeftSection/CartLeftSection";

const GridContainer = styled.div`
  display: grid;
  width: 70%;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 22px;
  justify-content: center;
`;

function ProductListPage() {
  const dispatch = useDispatch();
  const loading = useSelector(selectProductsLoading);
  const products = useSelector(selectCurrentProducts);
  const carts = useSelector(selectCurrentCarts);
  const error = useSelector(selectProductsError);

  useEffect(() => {
    dispatch(fetchProductsStart());
    dispatch(fetchCartsStart());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      throw new Error(error);
    }
  }, [error]);

  return (
    <WithSpinner loading={loading}>
      <GridContainer>
        {products.map(({ id, name, image, price }) => {
          return (
            <ProductCard
              key={id}
              id={id}
              name={name}
              thumbnail={image}
              price={price}
              $isincart={isInCart(id, carts)}
            />
          );
        })}
      </GridContainer>
    </WithSpinner>
  );
}

export default ProductListPage;
