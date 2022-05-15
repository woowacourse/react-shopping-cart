import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ProductCard from "component/ProductCard/ProductCard";
import WithSpinner from "component/@shared/WithSpinner/WithSpinner";
import Pagination from "component/@shared/Pagination/Pagination";
import PaginationButton from "component/@shared/PaginationButton/PaginationButton";

import { fetchProductsStart } from "redux/products/products.action";
import { fetchCartsStart } from "redux/carts/carts.action";
import {
  selectCurrentProducts,
  selectProductsError,
  selectProductsLoading,
} from "redux/products/products.selector";
import { selectCurrentCarts } from "redux/carts/carts.selector";

import { isInCart } from "util/check";
import { ROUTE_PATH } from "constants";

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

  const handleNavigatePage = (pageIdx) => {
    navigate(`/${pageIdx}`);
  };

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
      <Pagination>
        {new Array(5).fill("").map((_, i) => (
          <PaginationButton key={i} onClick={(_) => handleNavigatePage(i + 1)}>
            {i + 1}
          </PaginationButton>
        ))}
      </Pagination>
    </WithSpinner>
  );
}

export default ProductListPage;
