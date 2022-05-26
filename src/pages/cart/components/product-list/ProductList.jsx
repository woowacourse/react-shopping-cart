import { useDispatch, useSelector } from "react-redux";
import {
  uncheckAllCheckButton,
  checkAllCheckButton,
  removeCheckedCartItem,
} from "@/redux/modules/cartList";

import StyledProductList from "@/pages/cart/components/product-list/ProductList.styled";
import ProductItem from "@/pages/cart/components/product-item/ProductItem";
import Checkbox from "@/components/checkbox/Checkbox";

function ProductList() {
  const cartList = useSelector((state) => state.cartListState);
  const dispatch = useDispatch();

  const allCheckboxIsChecked = () => {
    const isAllChecked = cartList.every((item) => item.checked === true);
    return isAllChecked;
  };

  const handleChange = (e) => {
    const { checked } = e.target;

    if (checked) {
      dispatch(checkAllCheckButton());
      return;
    }
    dispatch(uncheckAllCheckButton());
  };

  const handleClick = () => {
    const isNonExistCheckedItem = cartList.every(
      (item) => item.checked === false
    );
    if (isNonExistCheckedItem) return;

    dispatch(removeCheckedCartItem());
  };

  return (
    <StyledProductList>
      <div>
        <div className="checkbox-container">
          <Checkbox
            id="checkbox"
            onChange={handleChange}
            checked={allCheckboxIsChecked() ? true : false}
          />
          <label htmlFor="checkbox" className="checkbox-label">
            선택해제
          </label>
        </div>
        <button onClick={handleClick} type="button" className="delete-button">
          상품삭제
        </button>
      </div>
      <h3 className="cart-title">든든배송 상품({cartList.length}개)</h3>
      <hr className="cart-title-border" />
      {cartList.map((item) => {
        return <ProductItem key={item.id} item={item} />;
      })}
    </StyledProductList>
  );
}

export default ProductList;
