import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import productObjsEquality from "@redux/equalities/productObjsEquality";
import createAction from "@redux/createAction";
import ACTION_TYPE from "@redux/actions";
import Button from "@shared/button/Button";
import LabeledCheckbox from "@shared/checkbox/labeled-checkbox/LabeledCheckbox";
import cartEquality from "@redux/equalities/cartEquality";
import getSelectedProductIds from "@cart/utils/getSelectedProductIds";
import CartFormProductTable from "./CartFormProductTable";
import styles from "./cart-form.module";

function CartForm({ className }) {
  const dispatch = useDispatch();
  const productObjs = useSelector(
    (state) => state.productObjs,
    productObjsEquality
  );
  const cart = useSelector((state) => state.cart, cartEquality);
  const productIdsInCart = Object.keys(cart);
  const selectedProductIds = getSelectedProductIds(cart);
  const isAllSelected =
    selectedProductIds.length > 0 &&
    selectedProductIds.length === productIdsInCart.length;

  const handleAllSelectToggle = useCallback(() => {
    if (isAllSelected) {
      dispatch(createAction(ACTION_TYPE.DESELECT_ALL_PRODUCTS_IN_CART));
      return;
    }
    dispatch(createAction(ACTION_TYPE.SELECT_ALL_PRODUCTS_IN_CART));
  }, [isAllSelected, dispatch]);
  const handleCheck = useCallback(
    (productId) => (e) => {
      const { checked } = e.target;
      if (checked) {
        dispatch(createAction(ACTION_TYPE.SELECT_PRODUCT_IN_CART, productId));
        return;
      }
      dispatch(createAction(ACTION_TYPE.DESELECT_PRODUCT_IN_CART, productId));
    },
    [dispatch]
  );
  const handleQuantityChange = useCallback(
    (productId) => (val) => {
      dispatch(
        createAction(ACTION_TYPE.UPDATE_PRODUCT_QUANTITY_IN_CART, {
          productId,
          quantity: val,
        })
      );
    },
    [dispatch]
  );
  const handleDeleteProduct = useCallback(
    (productId) => () => {
      dispatch(createAction(ACTION_TYPE.DELETE_PRODUCT_IN_CART, productId));
    },
    [dispatch]
  );
  const handleDeleteSelectedProducts = useCallback(() => {
    dispatch(
      createAction(
        ACTION_TYPE.DELETE_MULTIPLE_PRODUCTS_IN_CART,
        selectedProductIds
      )
    );
  }, [dispatch, selectedProductIds]);

  return (
    <div className={className}>
      <div className="flex justify-between mb-26">
        <LabeledCheckbox
          id="all-select"
          label={isAllSelected ? "선택해제" : "전체선택"}
          onChange={handleAllSelectToggle}
          checked={isAllSelected}
        />
        <Button onClick={handleDeleteSelectedProducts}>상품삭제</Button>
      </div>
      <div>
        <div className="mb-16">{`상품 리스트 (${productIdsInCart.length}개)`}</div>
        <CartFormProductTable
          cart={cart}
          productObjs={productObjs}
          productIdsInCart={productIdsInCart}
          selectedProductIds={selectedProductIds}
          onCheck={handleCheck}
          onQuantityChange={handleQuantityChange}
          onDeleteProduct={handleDeleteProduct}
          className={styles.table}
        />
      </div>
    </div>
  );
}

export default CartForm;
