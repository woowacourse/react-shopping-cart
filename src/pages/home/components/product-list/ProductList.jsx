import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "@/constants";
import { UPDATE_PRODUCT_LIST } from "@/redux/actions";
import createAction from "@/redux/createAction";
import StyledProductList from "@/pages/home/components/product-list/ProductList.styled";
import ProductItem from "@/pages/home/components/product-item/ProductItem";
import useFetch from "@/hooks/useFetch";

function ProductList() {
  const dispatch = useDispatch();
  const productList = useSelector(({ productList }) => productList);

  const [{ data, isLoading, isError }] = useFetch(
    `${API_URL}/products`,
    productList
  );

  useEffect(() => {
    dispatch(createAction(UPDATE_PRODUCT_LIST, data));
  }, [dispatch, data]);

  if (isLoading) return <p>Loading...😫</p>;
  if (isError) return <p>Error...!😫</p>;

  return (
    <StyledProductList>
      {productList.map((item) => (
        <ProductItem key={item.id} {...item} />
      ))}
    </StyledProductList>
  );
}

export default ProductList;
