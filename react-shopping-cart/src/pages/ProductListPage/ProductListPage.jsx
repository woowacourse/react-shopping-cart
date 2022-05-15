import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ProductCard from "component/ProductList/ProductCard/ProductCard";
import WithSpinner from "component/Wrapper/WithSpinner/WithSpinner";
import Pagination from "component/@shared/Pagination/Pagination";
import { GridContainer } from "./ProductListPage.style";

import { fetchProductsStart } from "redux/products/products.action";
import { fetchCartsStart } from "redux/carts/carts.action";
import {
  selectCurrentProducts,
  selectProductsError,
  selectProductsLoading,
} from "redux/products/products.selector";

import { ROUTE_PATH } from "constants";
import { ColumnFlexWrapper } from "styles/Wrapper";

function ProductListPage() {
  const dispatch = useDispatch();
  const loading = useSelector(selectProductsLoading);
  const products = useSelector(selectCurrentProducts);
  const error = useSelector(selectProductsError);
  const navigate = useNavigate();
  const { idx } = useParams();

  useEffect(() => {
    dispatch(fetchProductsStart(idx));
    dispatch(fetchCartsStart());
  }, [dispatch, idx]);

  useEffect(() => {
    if (error) {
      throw new Error(error);
    }
  }, [error]);

  useEffect(() => {
    if (typeof idx === "undefined") {
      navigate(ROUTE_PATH.FIRST_PAGE);
    }
  }, [idx, navigate]);

  return (
    <WithSpinner loading={loading}>
      <ColumnFlexWrapper gap="60px">
        <GridContainer>
          {products.map(({ id, name, image, price }) => {
            return (
              <ProductCard
                key={id}
                id={id}
                name={name}
                thumbnail={image}
                price={price}
              />
            );
          })}
        </GridContainer>
        <Pagination />
      </ColumnFlexWrapper>
    </WithSpinner>
  );
}

export default ProductListPage;
