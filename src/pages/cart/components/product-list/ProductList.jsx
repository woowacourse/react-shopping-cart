import ProductItem from "@/pages/cart/components/product-item/ProductItem";
import StyledProductList from "@/pages/cart/components/product-list/ProductList.styled";

function ProductList() {
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
      <ProductItem />
      <ProductItem />
      <ProductItem />
      <ProductItem />
      <ProductItem />
    </StyledProductList>
  );
}

export default ProductList;
