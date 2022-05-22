import { useSelector } from "react-redux";
import ProductItem from "@/pages/cart/components/product-item/ProductItem";
import StyledProductList from "@/pages/cart/components/product-list/ProductList.styled";

function ProductList() {
  const cartList = useSelector((state) => state.cartListState);
  console.log(cartList);

  return (
    <StyledProductList>
      <div>
        <div className="checkbox-container">
          <input className="checkbox" name="checkbox" type="checkbox" checked />
          <label className="checkbox-label">선택해제</label>
        </div>
        <button type="button" className="delete-button">
          상품삭제
        </button>
      </div>
      <h3 className="cart-title">든든배송 상품(3개)</h3>
      <hr className="cart-title-border" />
      {cartList.map((item) => {
        console.log(item);
        return <ProductItem key={item.id} item={item} />;
      })}
    </StyledProductList>
  );
}

export default ProductList;
