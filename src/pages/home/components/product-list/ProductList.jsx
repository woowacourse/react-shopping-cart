import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "@/constants";
import { UPDATE_PRODUCT_LIST } from "@/redux/actions";
import createAction from "@/redux/createAction";
import StyledProductList from "@/pages/home/components/product-list/ProductList.styled";
import ProductItem from "@/pages/home/components/product-item/ProductItem";

function ProductList() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const productList = useSelector(({ productList }) => productList);
  const dispatch = useDispatch();
  const getProductList = () => {
    return async (dispatch) => {
      const fetchResult = await fetch(`${API_URL}/products`);
      const productList = await fetchResult.json();
      setLoading(false);
      setError(null);
      dispatch(createAction(UPDATE_PRODUCT_LIST, productList));
    };
  };

  useEffect(() => {
    dispatch(getProductList());
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;
  return (
    <StyledProductList>
      {productList.map((item) => (
        <ProductItem key={item.id} {...item} />
      ))}
    </StyledProductList>
  );
}

export default ProductList;
