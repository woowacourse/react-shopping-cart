import { useDispatch, useSelector } from "react-redux";

import ProductItem from "@/pages/cart/components/product-item/ProductItem";
import StyledProductList from "@/pages/cart/components/product-list/ProductList.styled";
import { uncheckAllCheckButton, checkAllCheckButton } from "@/redux/actions";

function ProductList() {
  const cartList = useSelector((state) => state.cartListState);
  const dispatch = useDispatch();

  console.log(cartList);

  const handleChange = (e) => {
    const { checked } = e.target;
    if (checked) {
      dispatch(checkAllCheckButton());
      return;
    }
    dispatch(uncheckAllCheckButton());
  };

  return (
    <StyledProductList>
      <div>
        <div className="checkbox-container">
          <input
            className="checkbox"
            name="checkbox"
            type="checkbox"
            onChange={handleChange}
          />
          <label className="checkbox-label">선택해제</label>
        </div>
        <button type="button" className="delete-button">
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
