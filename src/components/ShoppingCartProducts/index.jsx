import ShoppingCartProduct from "../ShoppingCartProduct";
import * as S from "./index.styles";

const ShoppingCartProducts = ({
  products,
  handleAllChecked,
  isAllChecked,
  checkedProductIds,
  handleRemoveProducts,
}) => {
  return (
    <S.ShoppingCartProductsContainer>
      <S.ProductsControlContainer>
        <S.ProductsCheckBoxContainer>
          <S.ProductsCheckBox
            type="checkbox"
            id="total-check"
            name="total-check"
            checked={isAllChecked}
            onChange={handleAllChecked}
          />
          <label htmlFor="total-check">
            {isAllChecked ? "선택해제" : "전체선택"}
          </label>
        </S.ProductsCheckBoxContainer>
        <S.ProductsRemoveButton onClick={handleRemoveProducts} type="button">
          상품삭제
        </S.ProductsRemoveButton>
      </S.ProductsControlContainer>
      <S.ProductsTotalQuantity>
        든든배송 상품 ({products.length}개)
      </S.ProductsTotalQuantity>
      <div>
        {products.map((product) => {
          const { id } = product;
          const checked = checkedProductIds.includes(id);

          return (
            <ShoppingCartProduct
              checked={checked}
              key={product.id}
              {...product}
            />
          );
        })}
      </div>
    </S.ShoppingCartProductsContainer>
  );
};

export default ShoppingCartProducts;
