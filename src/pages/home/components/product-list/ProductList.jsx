import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ACTION_TYPE from "../../../../redux/actions";
import createAction from "../../../../redux/createAction";
import ProductItem from "../product-item/ProductItem";
import styles from "./product-list.module.scss";

const cn = require("classnames");

function ProductList({ className }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const productList = useSelector(({ productList }) => productList);
  const dispatch = useDispatch();
  const getProductList = () => {
    return async (dispatch) => {
      // eslint-disable-next-line no-undef
      const fetchResult = await fetch(`${API_URL}/products`);
      const productList = await fetchResult.json();
      setLoading(false);
      setError(null);
      dispatch(createAction(ACTION_TYPE.UPDATE_PRODUCT_LIST, productList));
    };
  };

  useEffect(() => {
    dispatch(getProductList());
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;
  return (
    <div className={cn("productList", styles.productList, className)}>
      {productList.map((item) => (
        <ProductItem key={item.id} {...item} />
      ))}
    </div>
  );
}

export default ProductList;
